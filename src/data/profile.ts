export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

// 내 정보와 링크는 여기서 수정하세요.
export const profile: Profile = {
  name: "홍길동",
  bio: "웹 개발자 · 글 쓰고 만드는 사람",
  imageUrl: "/profile.svg",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "blog", title: "블로그", url: "https://velog.io" },
    { id: "instagram", title: "Instagram", url: "https://instagram.com" },
  ],
};
