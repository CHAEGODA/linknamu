type LinkCardProps = {
  title: string;
  url: string;
  emoji?: string;
};

export default function LinkCard({ title, url, emoji }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="col-span-3 grid grid-cols-subgrid items-center rounded-3xl border border-white/70 bg-white/45 px-5 py-4 font-medium shadow-[0_4px_20px_-6px_rgba(150,90,60,0.18)] backdrop-blur-md transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_8px_24px_-8px_rgba(150,90,60,0.25)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9825f] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* 가운데 열은 목록 전체에서 가장 긴 제목에 맞춰지므로, 묶음이 정중앙에 오고 이모지·글자 시작 위치도 모든 카드에서 같습니다 */}
      <span className="col-start-2 flex items-center gap-4">
        <span aria-hidden="true" className="flex w-6 shrink-0 justify-center text-xl leading-none">
          {emoji}
        </span>
        <span>{title}</span>
      </span>
    </a>
  );
}
