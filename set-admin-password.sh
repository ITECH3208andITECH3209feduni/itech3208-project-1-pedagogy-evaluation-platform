#!/usr/bin/env bash
# Set the admin password directly, without an email round trip.
#
# The dashboard only offers "send recovery email" / "send magic link", and this
# project's email sending is failing, so neither works. This talks to the Auth
# Admin API instead, which sets the password immediately.
#
#   ./set-admin-password.sh [email]
#
# Defaults to mushfiqurr@students.federation.edu.au. Prompts for the password
# (never echoed, never stored in shell history).

set -euo pipefail

REF="ipmrufgdykvjvejvquin"
EMAIL="${1:-mushfiqurr@students.federation.edu.au}"
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

say()  { printf '%s\n' "$*"; }
fail() { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

# ---------------------------------------------------------------------------
# 1. Service role key. Try the Management API token from the handover doc; if
#    that is unavailable, ask for the key to be pasted in.
# ---------------------------------------------------------------------------
SERVICE_KEY=""

if [[ -f "$DIR/MASTER_CONTEXT.md" ]]; then
  TOKEN="$(grep -m1 -o 'sbp_[A-Za-z0-9]\{20,\}' "$DIR/MASTER_CONTEXT.md" || true)"
  if [[ -n "$TOKEN" ]]; then
    say "Fetching the service role key from the Supabase Management API..."
    RESP="$(curl -fsS -H "Authorization: Bearer $TOKEN" \
      "https://api.supabase.com/v1/projects/$REF/api-keys?reveal=true" 2>/dev/null || true)"
    SERVICE_KEY="$(printf '%s' "$RESP" | python3 -c '
import json, sys
try:
    keys = json.load(sys.stdin)
except Exception:
    sys.exit(0)
for k in keys if isinstance(keys, list) else []:
    if k.get("name") == "service_role":
        print(k.get("api_key", ""))
        break
' 2>/dev/null || true)"
  fi
fi

if [[ -z "$SERVICE_KEY" ]]; then
  say ""
  say "Could not fetch the key automatically. Get it here:"
  say "  https://supabase.com/dashboard/project/$REF/settings/api-keys"
  say "Copy the **service_role** key (the secret one, NOT anon/publishable)."
  say ""
  read -rsp "Paste service_role key: " SERVICE_KEY
  say ""
fi

[[ -n "$SERVICE_KEY" ]] || fail "No service role key supplied."

# ---------------------------------------------------------------------------
# 2. Find the user id for that email.
# ---------------------------------------------------------------------------
say "Looking up $EMAIL ..."
USERS="$(curl -fsS \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  "https://$REF.supabase.co/auth/v1/admin/users?per_page=200")" \
  || fail "Could not reach the Auth API. Is the project awake? Check the dashboard says Active, not 'Coming up'."

USER_ID="$(printf '%s' "$USERS" | EMAIL="$EMAIL" python3 -c '
import json, os, sys
want = os.environ["EMAIL"].lower()
data = json.load(sys.stdin)
for u in data.get("users", data if isinstance(data, list) else []):
    if (u.get("email") or "").lower() == want:
        print(u["id"]); break
')"

if [[ -z "$USER_ID" ]]; then
  say ""
  say "No account exists with that email. Existing accounts:"
  printf '%s' "$USERS" | python3 -c '
import json, sys
data = json.load(sys.stdin)
for u in data.get("users", data if isinstance(data, list) else []):
    print("   ", u.get("email") or "(anonymous)")
'
  say ""
  fail "Create the account first, or re-run with one of the emails above."
fi

say "Found the account."

# ---------------------------------------------------------------------------
# 3. Set the password.
# ---------------------------------------------------------------------------
read -rsp "New password (min 6 characters): " PW1; say ""
read -rsp "Confirm: " PW2; say ""
[[ "$PW1" == "$PW2" ]] || fail "Passwords do not match."
[[ ${#PW1} -ge 6 ]]    || fail "Supabase requires at least 6 characters."

RESULT="$(printf '%s' "$PW1" | python3 -c '
import json, sys
print(json.dumps({"password": sys.stdin.read(), "email_confirm": True}))
' | curl -fsS -X PUT \
  -H "apikey: $SERVICE_KEY" \
  -H "Authorization: Bearer $SERVICE_KEY" \
  -H "Content-Type: application/json" \
  --data-binary @- \
  "https://$REF.supabase.co/auth/v1/admin/users/$USER_ID")" \
  || fail "The update was rejected. Check the project is Active and the key is service_role."

printf '%s' "$RESULT" | python3 -c '
import json, sys
u = json.load(sys.stdin)
print("")
print("Password set for", u.get("email"))
print("Email confirmed :", bool(u.get("email_confirmed_at")))
print("")
print("Now sign in at  http://localhost:5173/admin.html")
'
