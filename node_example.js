// Fetch live listings for one event with the TicketsData API (Node.js 18+).
// Usage:
//   export TD_USERNAME="you@example.com"
//   export TD_PASSWORD="your-password"
//   node node_example.js ticketmaster "https://www.ticketmaster.com/event/160062583FD9756B"

async function main() {
  const [platform, eventUrl, mode] = process.argv.slice(2);
  if (!platform || !eventUrl) {
    console.error("Usage: node node_example.js <platform> <event_url> [mode]");
    process.exit(1);
  }

  const params = new URLSearchParams({
    username: process.env.TD_USERNAME,
    password: process.env.TD_PASSWORD,
    platform,
    event_url: eventUrl,
  });
  if (mode) params.set("mode", mode);

  let res;
  for (const wait of [0, 1500, 3000]) {
    await new Promise((r) => setTimeout(r, wait));
    res = await fetch(`https://ticketsdata.com/fetch?${params}`);
    if (![503, 504].includes(res.status)) break;
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);

  const data = await res.json();
  console.log(`${data.platform}: HTTP ${data.status} in ${data.response_s}s`);
  console.log("Credits left:", data.quota_remaining);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
