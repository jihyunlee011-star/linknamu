import { Suspense } from "react";
import { links, profile } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";
import LinkList from "@/components/LinkList";
import ProfileHeader from "@/components/ProfileHeader";

async function LinkListWithCounts() {
  const counts = await getClickCounts();
  return <LinkList links={links} counts={counts} />;
}

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-[28rem] flex-1 flex-col items-center gap-10 px-6 pt-16 pb-10 sm:gap-12 sm:pt-24">
      <ProfileHeader profile={profile} />
      {/* 프로필과 링크는 바로 보여 주고, 클릭 수는 DB에서 읽히는 대로 채워 넣습니다. */}
      <Suspense fallback={<LinkList links={links} counts={null} />}>
        <LinkListWithCounts />
      </Suspense>
      <footer className="mt-auto pt-8 text-xs font-medium tracking-wide text-muted/70">
        🌳 링크나무
      </footer>
    </main>
  );
}
