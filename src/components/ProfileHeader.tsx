import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 은은한 그림자로 살짝 떠 있는 듯한 입체감 */}
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_12px_32px_-8px_rgba(150,90,60,0.35),0_2px_6px_rgba(150,90,60,0.12)] ring-1 ring-white/80">
        <Image
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          width={112}
          height={112}
          preload
          className="h-28 w-28 rounded-full object-cover object-top"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-muted">{bio}</p>
    </header>
  );
}
