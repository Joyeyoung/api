import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const targetURL = 'https://www.bizinfo.go.kr/web/lay1/bbs/S1T122C128/AS/74/list.do?rows=15&cpage=1&schAreaDetailCodes=6450000&schEndAt=Y';
    const { data } = await axios.get(targetURL);
    const $ = cheerio.load(data);
    const results = [];

    $('.p-table__list tbody tr').each((i, el) => {
      const cols = $(el).find('td');
      const title = cols.eq(1).text().trim();
      const link = 'https://www.bizinfo.go.kr' + cols.eq(1).find('a').attr('href');
      const organization = cols.eq(2).text().trim();
      const deadline = cols.eq(4).text().trim();

      results.push({
        title,
        organization,
        deadline,
        type: '지역사업',
        score: '중간',
        keywords: '',
        doc: link,
        link: link
      });
    });

    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: '크롤링 실패', detail: err.message });
  }
}
