import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {/* 흰 테두리 + 아래로 떨어지는 따뜻한 그림자로 살짝 떠 있는 느낌 */}
      <div className="rounded-full bg-white/70 p-1.5 shadow-[0_18px_40px_-12px_rgba(180,100,60,0.45),0_4px_10px_-4px_rgba(120,70,40,0.2)] ring-1 ring-white/80">
        <Image
          src={profile.avatar}
          alt={`${profile.name} 프로필 사진`}
          width={112}
          height={112}
          priority
          className="size-24 rounded-full object-cover sm:size-28"
        />
      </div>
      <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-[1.75rem]">
        {profile.name}
      </h1>
      <p className="mt-2 max-w-[18rem] text-[0.9375rem] leading-relaxed text-muted">
        {profile.bio}
      </p>
    </header>
  );
}
