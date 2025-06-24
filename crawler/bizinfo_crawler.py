import requests
from bs4 import BeautifulSoup
import json

url = "https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/list.do"
res = requests.get(url)
soup = BeautifulSoup(res.text, 'html.parser')

notices = []
for li in soup.select(".p-table__list tbody tr"):
    cols = li.find_all("td")
    if len(cols) > 1:
        title = cols[1].get_text(strip=True)
        date = cols[3].get_text(strip=True)
        notices.append({"title": title, "date": date})

with open("../data/notices.json", "w", encoding="utf-8") as f:
    json.dump(notices, f, ensure_ascii=False, indent=2)
