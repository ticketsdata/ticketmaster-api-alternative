#!/usr/bin/env bash
# Fetch live listings for one event with the TicketsData API.
# Usage:
#   export TD_USERNAME="you@example.com"
#   export TD_PASSWORD="your-password"
#   ./curl_example.sh ticketmaster "https://www.ticketmaster.com/event/160062583FD9756B"

set -euo pipefail

PLATFORM="${1:-ticketmaster}"
EVENT_URL="${2:-https://www.ticketmaster.com/event/160062583FD9756B}"

curl -sS -G "https://ticketsdata.com/fetch" \
  --data-urlencode "username=${TD_USERNAME}" \
  --data-urlencode "password=${TD_PASSWORD}" \
  --data-urlencode "platform=${PLATFORM}" \
  --data-urlencode "event_url=${EVENT_URL}"
