import requests
from bs4 import BeautifulSoup
import json

def get_bizinfo_data(page=1):
    url = "https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/list.do"
    params = {
        'rows': 15,
        'cpage': page,
        'schWntyAt': 'Y',
        'schEndAt': 'Y',
    }

    response = requests.get(url, params=params)
    soup = BeautifulSoup(response.text, 'html.parser')

    items = []
    for row in soup.select("table.board-list tbody tr"):
        cols = row.find_all("td")
        if len(cols) >= 5:
            title = cols[1].text.strip()
            institution = cols[2].text.strip()
            date = cols[3].text.strip()
            link = "https://www.bizinfo.go.kr" + cols[1].find('a')['href']
            items.append({
                "title": title,
                "institution": institution,
                "date": date,
                "link": link
            })
    return items

if __name__ == "__main__":
    data = get_bizinfo_data()
    with open("public/bizinfo.json", "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)