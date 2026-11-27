import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-6 py-16 sm:px-8 sm:py-24">
      <ProfileHeader
        name={profile.name}
        bio={profile.bio}
        imageUrl={profile.imageUrl}
      />
      {/* 3열 그리드(좌 여백 | 이모지+제목 | 우 여백)를 카드들이 subgrid로 공유 */}
      <ul className="mt-10 grid grid-cols-[1fr_auto_1fr] gap-y-4">
        {profile.links.map((link) => (
          <li key={link.id} className="col-span-3 grid grid-cols-subgrid">
            <LinkCard title={link.title} url={link.url} emoji={link.emoji} />
          </li>
        ))}
      </ul>
    </main>
  );
}
