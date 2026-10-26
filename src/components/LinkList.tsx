import type { LinkItem } from "@/data/profile";
import LinkCard from "@/components/LinkCard";

type Props = {
  links: LinkItem[];
  counts: Record<string, number> | null;
};

export default function LinkList({ links, counts }: Props) {
  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} initialCount={counts ? (counts[link.id] ?? 0) : null} />
        </li>
      ))}
    </ul>
  );
}
