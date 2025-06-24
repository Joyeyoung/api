import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  try {
    const motieData = await axios.get('https://www.motie.go.kr/motie/ne/announce/notice');
    const $ = cheerio.load(motieData.data);
    const results = [];

    $('.board_list tbody tr').slice(0, 5).each((i, el) => {
      const title = $(el).find('td.title a').text().trim();
      const link = 'https://www.motie.go.kr' + $(el).find('td.title a').attr('href');
      const date = $(el).find('td').last().text().trim();

      results.push({
        type: 'MOTIE',
        score: '적합도 중간',
        title,
        deadline: date,
        organization: '산업통상자원부',
        keywords: '',
        doc: '#',
        link
      });
    });

    res.status(200).json(results);
  } catch (e) {
    res.status(500).json({ error: '크롤링 실패', details: e.message });
  }
}
