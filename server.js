
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/notices', async (req, res) => {
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

    res.json(results);
  } catch (error) {
    console.error('크롤링 오류:', error);
    res.status(500).json({ error: '크롤링 실패' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
