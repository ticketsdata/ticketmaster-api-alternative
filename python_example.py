import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
url = "https://api.ticketsdata.com/v1/event?url=https://www.ticketmaster.com/sabrina-carpenter-short-n-sweet-tour-pittsburgh-pennsylvania-10-23-2025/event/160062583FD9756B"

response = requests.get(url, headers=headers)
print(response.json())
