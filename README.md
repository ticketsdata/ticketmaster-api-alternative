# 🎟️ Ticketmaster API Alternative

**Unofficial Ticketmaster API alternative** for developers who need real-time event & ticket data without CAPTCHAs, IP blocks, or strict rate limits.  
Powered by [TicketsData.com](https://ticketsdata.com).

---

## 🚀 Why use this instead of the official Ticketmaster API?

| Feature | Official Ticketmaster API | TicketsData API |
|---------|---------------------------|-----------------|
| Rate Limits | ✅ Strict (can block at scale) | 🚀 High-volume friendly |
| CAPTCHAs | ❌ Can trigger frequently | ✅ No CAPTCHAs |
| Seat-level Inventory | ❌ Limited | ✅ Full seat-level inventory |
| Multi-platform Data | ❌ Ticketmaster only | ✅ Ticketmaster, SeatGeek, StubHub, VividSeats, Eventbrite |
| Authentication | API Key only | Secure API Key + Token auth |
| Pricing | Free tier but limited | Simple paid plans, scale as needed |

👉 Learn more at [ticketsdata.com](https://ticketsdata.com)

---

## ⚡ Quick API Example

### cURL
```bash
curl -X GET "https://api.ticketsdata.com/v1/event?url=https://www.ticketmaster.com/some-event-id"   -H "Authorization: Bearer YOUR_API_KEY"
```

### Python
```python
import requests

headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}
url = "https://api.ticketsdata.com/v1/event?url=https://www.ticketmaster.com/some-event-id"

response = requests.get(url, headers=headers)
print(response.json())
```

### Node.js
```javascript
import fetch from "node-fetch";

const url = "https://api.ticketsdata.com/v1/event?url=https://www.ticketmaster.com/some-event-id";
const headers = { "Authorization": "Bearer YOUR_API_KEY" };

const res = await fetch(url, { headers });
const data = await res.json();
console.log(data);
```

---

## 📊 Live Ticket Data Example
Here’s a **realistic Ticketmaster event response** (demo only):

```json
{
  "status": 200,
  "body": {
    "meta": {
      "modified": "2025-09-26T11:01:22.698333450Z",
      "expires": "2025-09-26T11:02:22.698333450Z"
    },
    "eventId": "160062583FD9756B",
    "facets": [
      {
        "available": true,
        "description": "IE5DMLBY",
        "inventoryTypes": ["resale"],
        "offerTypes": ["standard"],
        "offers": ["GN6DSMBRGQ2TMNRVHB6DCNBUGI3TGNBTGU2Q"],
        "section": "101",
        "count": 2,
        "places": ["GEYDCOSSHIYT[C,E]"],
        "placeGroups": ["GF6DCNQ"]
      },
      {
        "available": true,
        "description": "IE5DMLBY",
        "inventoryTypes": ["resale"],
        "offerTypes": ["standard"],
        "offers": ["GN6DSMBQGIZDINJRGV6DCNBUGQ4DQODDHA2Q"],
        "section": "101",
        "count": 2,
        "places": ["GEYDCOSTHIYT[C,E]"],
        "placeGroups": ["GF6DCNQ"]
      }
      // … more facets omitted
    ]
  }
}
```

---

## 🛠️ What this means
- **eventId** → Ticketmaster’s internal event ID  
- **facets** → Seat/section-level availability data  
- **inventoryTypes** → `resale` / `primary`  
- **offers** → Encoded Ticketmaster offers  
- **places / placeGroups** → Venue seat mapping  

👉 With **TicketsData API**, you don’t just get this raw structure — you also get it **cleaned, normalized, and enriched** so you can build apps faster.  

---

## 📦 Platforms Supported
- Ticketmaster 🎟️  
- SeatGeek  
- StubHub  
- VividSeats  
- Eventbrite  

---

## 🔑 Getting Started
1. Sign up at [ticketsdata.com](https://ticketsdata.com)  
2. Get your API key  
3. Make your first request in under 60 seconds  

---

## 📚 Resources
- [TicketsData Docs](https://ticketsdata.com/docs)  
- [Pricing Plans](https://ticketsdata.com/pricing)  
- [FAQ](https://ticketsdata.com/faq)  

---

## 📝 License
MIT License – feel free to use the examples here.
