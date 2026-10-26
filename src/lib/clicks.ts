import "server-only";
import { io } from "next/cache";
import { getDb } from "@/lib/mongodb";

type ClickDoc = { _id: string; count: number };

async function getCollection() {
  const db = await getDb();
  return db?.collection<ClickDoc>("clicks") ?? null;
}

/** 링크별 클릭 수. DB를 쓸 수 없으면 null. */
export async function getClickCounts(): Promise<Record<string, number> | null> {
  // 빌드 시점 값으로 굳지 않도록 정적 셸에서 제외하고 요청마다 새로 읽습니다.
  await io();
  try {
    const clicks = await getCollection();
    if (!clicks) return null;
    const docs = await clicks.find().toArray();
    return Object.fromEntries(docs.map((doc) => [doc._id, doc.count]));
  } catch (error) {
    console.error("[clicks] 클릭 수 조회 실패", error);
    return null;
  }
}

/** 클릭 수를 1 올리고 새 값을 반환합니다. DB를 쓸 수 없으면 null. */
export async function incrementClick(id: string): Promise<number | null> {
  const clicks = await getCollection();
  if (!clicks) return null;
  const doc = await clicks.findOneAndUpdate(
    { _id: id },
    { $inc: { count: 1 } },
    { upsert: true, returnDocument: "after" },
  );
  return doc?.count ?? null;
}
