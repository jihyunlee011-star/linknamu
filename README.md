# 🌳 링크나무

내 모든 링크를 한 페이지에 모아 하나의 URL로 공유하는 Link in Bio 서비스입니다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # MONGODB_URI에 Atlas 연결 문자열 입력
npm run dev
```

http://localhost:3000 에서 확인하세요.

## 내 정보로 바꾸기

[src/data/profile.ts](src/data/profile.ts)만 수정하면 됩니다.

- `profile`: 이름, 소개, 사진 경로 (사진은 `public/`에 넣기)
- `links`: 링크 목록. `id`는 클릭 수 저장 키이므로 한 번 정하면 바꾸지 마세요.

## 클릭 수 집계

- 링크 카드를 누르면 `POST /api/clicks`로 `{ id }`를 보내고, MongoDB `clicks` 컬렉션에서 해당 문서의 `count`를 1 올립니다.
- `GET /api/clicks`로 전체 클릭 수를 볼 수 있습니다.
- `MONGODB_URI`가 없으면 클릭 수 배지만 숨겨지고 페이지는 그대로 동작합니다.

## 구조

```
src/
  app/
    page.tsx              메인 페이지 (프로필 + 링크 목록)
    api/clicks/route.ts   클릭 수 집계 API
  components/
    ProfileHeader.tsx     프로필 (이름, 소개, 사진)
    LinkList.tsx          링크 카드 목록
    LinkCard.tsx          링크 카드 + 클릭 추적 (클라이언트 컴포넌트)
  data/profile.ts         프로필·링크 데이터
  lib/
    mongodb.ts            MongoDB 연결
    clicks.ts             클릭 수 조회/증가
```

## Vercel 배포

1. GitHub에 올린 뒤 Vercel에서 저장소를 import 합니다.
2. Project Settings → Environment Variables에 `MONGODB_URI`, `MONGODB_DB`를 추가합니다.
3. MongoDB Atlas → Network Access에서 Vercel이 접속할 수 있도록 허용합니다 (예: `0.0.0.0/0`).
