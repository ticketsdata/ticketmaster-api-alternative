# TicketsData API: Unofficial Ticketmaster API Alternative

Real-time event and ticket data through one REST API. Fetch live listings, prices, fees and seat-level inventory for any public event on ten primary and secondary marketplaces, and get clean JSON back in seconds.

[Website](https://ticketsdata.com) · [Docs](https://ticketsdata.com/docs) · [Postman Docs](https://documenter.getpostman.com/view/60126198/2sBYHaNGXz) · [Pricing](https://ticketsdata.com/pricing) · [Supported marketplaces](https://ticketsdata.com/marketplaces) · [MCP server](https://github.com/ticketsdata/ticketsdata-mcp)

> **Unofficial.** TicketsData is an independent data service. It is not affiliated with, endorsed by or sponsored by Ticketmaster or any other marketplace listed here. All marketplace names are trademarks of their respective owners and are used only to identify the data sources the API supports.

---

## Why TicketsData

- **Live data, no cache.** Every request goes to the marketplace in real time. Typical responses take 1 to 2 seconds, and some marketplaces respond in under a second.
- **One API, many sources.** The same request format works across Ticketmaster, StubHub, SeatGeek, Vivid Seats, Gametime, TickPick, viagogo, DICE, Eventbrite and AXS.
- **Full listings, no pagination.** All pages of an event are merged into one response.
- **Seat-level detail.** Section, row, quantity, splits, list price, fees and all-in price, plus primary or resale inventory type.
- **Cross-market reports.** Match one event across marketplaces and compare prices, inventory and section-level spreads in a single call.
- **AI ready.** An official MCP server connects Claude, Cursor and other AI assistants to live ticket data.

## Quick start

1. Create an account at [ticketsdata.com](https://ticketsdata.com). The free trial needs no credit card and includes 25 API credits and 3 match reports.
2. Use your account email and password to authenticate.
3. Make your first request:

```bash
curl -G "https://ticketsdata.com/fetch" \
  --data-urlencode "username=$TD_USERNAME" \
  --data-urlencode "password=$TD_PASSWORD" \
  --data-urlencode "platform=ticketmaster" \
  --data-urlencode "event_url=https://www.ticketmaster.com/event/160062583FD9756B"
```

Keep your credentials in environment variables and always use HTTPS.

**Prefer Postman?** Open the official [TicketsData API collection](https://documenter.getpostman.com/view/60126198/2sBYHaNGXz), fork it from the [TicketsData workspace](https://www.postman.com/ticketsdata), set the `username` and `password` variables to your account email and password, and run any endpoint.

## Authentication

Every request takes two query parameters:

| Parameter | Value |
|---|---|
| `username` | Your TicketsData account email |
| `password` | Your TicketsData account password |

## Endpoints

Base URL: `https://ticketsdata.com`

### `GET /fetch`: live listings for one event

| Parameter | Required | Description |
|---|---|---|
| `platform` | yes | `ticketmaster`, `stubhub`, `seatgeek`, `vividseats`, `gametime`, `tickpick`, `viagogo`, `dice`, `eventbrite`, `axs` |
| `event_url` | yes | Full event URL (event ID for Gametime and DICE) |
| `mode` | no | Ticketmaster: `availability`, `pricing`, `quickpicks`. Gametime: `all`, `qty=N` |

Cost: 1 API credit.

### `GET /events`: all events for a performer, venue or organizer

| Parameter | Required | Description |
|---|---|---|
| `platform` | yes | Marketplace name |
| `performer_url` | yes* | Performer, artist or organizer page URL |
| `venue_url` | DICE only | `dice.fm/venue/...` or `dice.fm/promoters/...` URL |

Cost: 1 API credit.

### `GET /events?mode=all`: event catalog snapshots

Full or incremental export of stored events with filters such as `country`, `state`, `city`, `q`, `date_from`, `date_to`, `updated_since` and cursor pagination. Available on Pro and above. Call with `help=1` to list every parameter at no cost. See the [docs](https://ticketsdata.com/docs) for details.

### `GET /match`: cross-market report

| Parameter | Required | Description |
|---|---|---|
| `event_url` | yes | Event URL from any supported resale marketplace |

Matches the event on other marketplaces and returns per-market summaries, a cross-market snapshot, section spreads and recommendations. Cost: 1 report plus up to 12 API credits. Available on Pro and above.

## Code examples

### Python

```python
import os
import requests

params = {
    "username": os.environ["TD_USERNAME"],
    "password": os.environ["TD_PASSWORD"],
    "platform": "ticketmaster",
    "event_url": "https://www.ticketmaster.com/event/160062583FD9756B",
}

r = requests.get("https://ticketsdata.com/fetch", params=params, timeout=60)
r.raise_for_status()
data = r.json()

print(data["status"], data["platform"], f'{data["response_s"]}s')
print("Credits left:", data["quota_remaining"])
```

### Node.js (18+)

```javascript
const params = new URLSearchParams({
  username: process.env.TD_USERNAME,
  password: process.env.TD_PASSWORD,
  platform: "ticketmaster",
  event_url: "https://www.ticketmaster.com/event/160062583FD9756B",
});

const res = await fetch(`https://ticketsdata.com/fetch?${params}`);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const data = await res.json();

console.log(data.status, data.platform, `${data.response_s}s`);
console.log("Credits left:", data.quota_remaining);
```

More examples: [`python_example.py`](python_example.py), [`node_example.js`](node_example.js), [`curl_example.sh`](curl_example.sh), and the [Postman collection](https://documenter.getpostman.com/view/60126198/2sBYHaNGXz).

## Response format

Every `/fetch` response uses the same envelope. The `body` contains the marketplace's listing data.

```json
{
  "status": 200,
  "platform": "ticketmaster",
  "body": {
    "_embedded": {
      "offer": [
        {
          "offerId": "...",
          "section": "605",
          "row": "-",
          "listPrice": "380.00",
          "totalPrice": 459.80,
          "inventoryType": "resale",
          "sellableQuantities": [1, 2, 3, 4]
        }
      ]
    }
  },
  "response_s": 2.14,
  "quota_remaining": 117382
}
```

## Errors

| HTTP | Code | Meaning |
|---|---|---|
| 400 | `invalid_url` | Malformed or unrecognized event URL |
| 400 | `performer_not_found` | Performer page not found |
| 401 | | Invalid credentials |
| 402 | `quota_exceeded` | Monthly credits used up |
| 403 | `plan_restriction` | Feature not in your plan (credit refunded) |
| 404 | `event_not_found` | Event removed or no longer exists |
| 429 | | Too many requests |
| 503 | `service_unavailable` | Marketplace temporarily unavailable |
| 504 | `timeout` | Request timed out |

Retry `503` and `504` up to two times (wait 1.5 s, then 3 s). Other errors are deterministic, so don't retry them.

## Limits

- `/fetch` and `/events` cost 1 API credit each. Credits reset every billing month and don't roll over.
- Shared plans allow 5 to 15 concurrent requests.
- Dedicated plans are available for high volumes. [Contact sales](https://ticketsdata.com/contact?topic=dedicated).

## MCP server

Connect AI assistants to live ticket data with the official [TicketsData MCP server](https://github.com/ticketsdata/ticketsdata-mcp).

## Use cases

- Ticket brokers: live pricing and inventory across marketplaces
- Analytics teams: market and demand research
- Developers: price comparison, alert and event discovery apps
- AI agents: real-time ticket data through MCP

## Support

- Docs: [ticketsdata.com/docs](https://ticketsdata.com/docs)
- Postman: [TicketsData API collection](https://documenter.getpostman.com/view/60126198/2sBYHaNGXz) · [workspace](https://www.postman.com/ticketsdata)
- FAQ: [ticketsdata.com/faq](https://ticketsdata.com/faq)
- Email: info@ticketsdata.com

## License

The code examples in this repository are released under the [MIT License](LICENSE). Use of the TicketsData API is governed by the [TicketsData Terms of Service](https://ticketsdata.com/legal/terms).

---

TicketsData™ and the TD logo are trade marks of TicketsData Ltd, registered in England and Wales (company no. 17150266). [ticketsdata.com](https://ticketsdata.com) is the only official TicketsData website.
