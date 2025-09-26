import fetch from "node-fetch";

const url = "https://api.ticketsdata.com/v1/event?url=https://www.ticketmaster.com/sabrina-carpenter-short-n-sweet-tour-pittsburgh-pennsylvania-10-23-2025/event/160062583FD9756B";
const headers = { "Authorization": "Bearer YOUR_API_KEY" };

const res = await fetch(url, { headers });
const data = await res.json();
console.log(data);
