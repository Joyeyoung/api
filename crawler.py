import requests
from bs4 import BeautifulSoup
import json

BASE_URL = "https://www.bizinfo.go.kr"
LIST_URL = f"{BASE_URL}/web/lay1/bbs/S1T122C128/AS/74/list.do"
PARAMS = {
    "rows": 15,
    "cpage": 1,
    "schWntyAt": "Y",
    "schAreaDetailCodes": "6450000",  # 서울 지역 코드
    "schEndAt": "Y"
}

def crawl_bizinfo():
    res = requests.get(LIST_URL, params=PARAMS)
    res.encoding = "utf-8"
    soup = BeautifulSoup(res.text, "html.parser")

    items = []
    rows = soup.select(".table_list tbody tr")

    for row in rows:
        cols = row.find_all("td")
        if len(cols) < 5:
            continue
        title_tag = cols[1].find("a")
        item = {
            "title": title_tag.text.strip(),
            "summary": f"{cols[2].text.strip()} 분야 공고",
            "status": cols[0].text.strip(),
            "category": cols[2].text.strip(),
            "period": cols[4].text.strip(),
            "url": BASE_URL + title_tag["href"]
        }
        items.append(item)

    # 저장
    with open("public/notices.json", "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    crawl_bizinfo()
