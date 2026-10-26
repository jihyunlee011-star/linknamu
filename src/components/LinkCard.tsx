"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  /** null이면 DB가 연결되지 않아 클릭 수를 표시하지 않습니다. */
  initialCount: number | null;
};

function trackClick(id: string) {
  const body = JSON.stringify({ id });
  // sendBeacon은 새 탭으로 이동하거나 페이지를 떠나도 요청이 끊기지 않습니다.
  if (navigator.sendBeacon?.("/api/clicks", new Blob([body], { type: "application/json" }))) {
    return;
  }
  void fetch("/api/clicks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  });
}

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);
  const isExternal = /^https?:\/\//.test(link.url);

  return (
    <a
      href={link.url}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onClick={() => {
        trackClick(link.id);
        setCount((c) => (c === null ? c : c + 1));
      }}
      className="flex min-h-16 w-full items-center gap-3 rounded-3xl border border-white/70 bg-white/45 px-3 py-3 shadow-[0_8px_24px_-12px_rgba(150,90,60,0.25),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/60 hover:shadow-[0_12px_28px_-12px_rgba(150,90,60,0.32),inset_0_1px_0_rgba(255,255,255,0.9)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {/* 양옆 칸 너비를 맞춰 제목이 항상 정가운데 오도록 합니다. */}
      <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-white/60 text-lg">
        {link.emoji}
      </span>
      <span className="flex-1 truncate text-center text-[0.9375rem] font-semibold">
        {link.title}
      </span>
      <span className="flex w-10 shrink-0 justify-end pr-1">
        {count !== null && (
          <span
            className="text-xs font-medium tabular-nums text-muted"
            aria-label={`클릭 ${count}회`}
          >
            {count.toLocaleString("ko-KR")}
          </span>
        )}
      </span>
    </a>
  );
}
