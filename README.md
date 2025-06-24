# 정부지원사업 공고 페이지 (Vercel 배포용)

## 📦 구조
- `public/index.html`: 정적 웹페이지
- `api/getNotices.js`: 공고 데이터 반환 API
- `data/notices.json`: 크롤러 결과 저장소
- `crawler/bizinfo_crawler.py`: 공고 크롤링용 파이썬 스크립트

## 🚀 배포
1. GitHub에 이 프로젝트 업로드
2. [Vercel](https://vercel.com)에서 New Project → GitHub 연동
3. 자동 빌드 및 배포 완료

## 🛠 사용
- 크롤러는 로컬에서 실행: `python bizinfo_crawler.py`
- 공고 데이터는 `/api/getNotices`를 통해 JSON 반환됨
