#!/usr/bin/env bash

BASE="http://localhost:8080"

echo "=== 1. Login ==="
RESPONSE=$(curl -sf -X POST "$BASE/login" -H "Content-Type: application/json") || {
  echo "ERROR: Could not reach $BASE — is the port-forward running?"
  echo "  kubectl port-forward svc/jwt-app -n demo 8080:8080"
  exit 1
}
echo "$RESPONSE"

TOKEN=$(echo "$RESPONSE" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo ""
echo "Token: $TOKEN"

echo ""
echo "=== 2. Protected ==="
curl -s -X GET "$BASE/protected" \
  -H "Authorization: Bearer $TOKEN"
echo ""
