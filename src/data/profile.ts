export type Profile = {
  name: string;
  bio: string;
  avatar: string;
};

export type LinkItem = {
  /** 클릭 수를 저장할 때 쓰는 고유 키. 한 번 정하면 바꾸지 마세요. */
  id: string;
  title: string;
  url: string;
  emoji?: string;
};

// 이 파일만 수정하면 페이지 내용이 바뀝니다.
export const profile: Profile = {
  name: "홍길동",
  bio: "프론트엔드 개발자 · 커피와 산책을 좋아해요",
  avatar: "/avatar.svg",
};

export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com", emoji: "💻" },
  { id: "blog", title: "기술 블로그", url: "https://velog.io", emoji: "✍️" },
  { id: "instagram", title: "Instagram", url: "https://instagram.com", emoji: "📷" },
  { id: "youtube", title: "YouTube 채널", url: "https://youtube.com", emoji: "▶️" },
  { id: "email", title: "이메일 보내기", url: "mailto:hello@example.com", emoji: "✉️" },
];

export const linkIds = new Set(links.map((link) => link.id));
