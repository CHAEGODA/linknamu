export type LinkItem = {
  id: string;
  title: string;
  url: string;
  emoji?: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

// 내 정보와 링크는 여기서 수정하세요.
export const profile: Profile = {
  name: "채다영",
  bio: "백엔드 개발자 | 요즘에는 AI 개발에 관심이 많습니다.",
  imageUrl: "/profile.jpg",
  links: [
    { id: "github", emoji: "💻", title: "GitHub", url: "https://github.com/CHAEGODA" },
    { id: "velog", emoji: "📝", title: "Velog", url: "https://velog.io/@chaegoda/posts" },
    { id: "instagram", emoji: "📸", title: "Instagram", url: "https://www.instagram.com/chae_go.da" },
  ],
};
