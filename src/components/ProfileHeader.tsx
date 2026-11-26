import Image from "next/image";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={96}
        height={96}
        preload
        className="h-24 w-24 rounded-full object-cover object-top ring-4 ring-white shadow-md"
      />
      <h1 className="mt-4 text-xl font-bold">{name}</h1>
      <p className="mt-1 text-sm text-foreground/70">{bio}</p>
    </header>
  );
}
