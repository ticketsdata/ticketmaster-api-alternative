"""Fetch live listings for one event with the TicketsData API.

Usage:
    export TD_USERNAME="you@example.com"
    export TD_PASSWORD="your-password"
    python python_example.py ticketmaster "https://www.ticketmaster.com/event/160062583FD9756B"
"""
import os
import sys
import time

import requests

BASE_URL = "https://ticketsdata.com"
RETRY_CODES = {503, 504}


def fetch(platform, event_url, mode=None):
    params = {
        "username": os.environ["TD_USERNAME"],
        "password": os.environ["TD_PASSWORD"],
        "platform": platform,
        "event_url": event_url,
    }
    if mode:
        params["mode"] = mode

    for wait in (0, 1.5, 3):
        time.sleep(wait)
        r = requests.get(f"{BASE_URL}/fetch", params=params, timeout=60)
        if r.status_code not in RETRY_CODES:
            break
    r.raise_for_status()
    return r.json()


if __name__ == "__main__":
    if len(sys.argv) < 3:
        sys.exit("Usage: python python_example.py <platform> <event_url> [mode]")
    data = fetch(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)
    print(f'{data["platform"]}: HTTP {data["status"]} in {data["response_s"]}s')
    print("Credits left:", data["quota_remaining"])
