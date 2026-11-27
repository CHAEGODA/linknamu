"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모두 0회로 표시합니다.
  const [counts, setCounts] = useState<Record<string, number>>(() =>
    Object.fromEntries(links.map((link) => [link.id, 0])),
  );

  // 페이지가 열리면 모든 링크의 클릭 수를 한 번에 가져옵니다.
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/clicks", { cache: "no-store", signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Record<string, number>>;
      })
      // 받는 사이에 사용자가 이미 클릭했다면 그 값보다 줄어들지 않도록 큰 값을 씁니다.
      .then((data) =>
        setCounts((prev) => {
          const next = { ...prev };
          for (const [id, count] of Object.entries(data)) {
            next[id] = Math.max(prev[id] ?? 0, count);
          }
          return next;
        }),
      )
      .catch((err) => {
        if (err.name !== "AbortError") console.error("클릭 수를 불러오지 못했습니다.", err);
      });
    return () => controller.abort();
  }, []);

  function handleClick(id: string) {
    // 화면에는 바로 +1 해서 보여 주고, 서버에도 기록합니다.
    // keepalive 덕분에 페이지를 벗어나도 요청이 끝까지 전송됩니다.
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
    fetch(`/api/clicks/${encodeURIComponent(id)}`, { method: "POST", keepalive: true }).catch(
      (err) => console.error("클릭 수를 저장하지 못했습니다.", err),
    );
  }

  return (
    // 3열 그리드(좌 여백 | 이모지+제목 | 우 여백·클릭 수)를 카드들이 subgrid로 공유
    <ul className="mt-10 grid grid-cols-[1fr_auto_1fr] gap-y-4">
      {links.map((link) => (
        <li key={link.id} className="col-span-3 grid grid-cols-subgrid">
          <LinkCard
            title={link.title}
            url={link.url}
            emoji={link.emoji}
            count={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
