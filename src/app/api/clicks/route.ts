import { linkIds } from "@/data/profile";
import { getClickCounts, incrementClick } from "@/lib/clicks";

export async function GET() {
  const counts = await getClickCounts();
  if (!counts) {
    return Response.json({ error: "클릭 수 저장소가 설정되지 않았습니다." }, { status: 503 });
  }
  return Response.json({ counts });
}

export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  // 등록된 링크만 집계해서 임의의 키로 DB가 채워지는 것을 막습니다.
  if (typeof id !== "string" || !linkIds.has(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const count = await incrementClick(id);
    if (count === null) {
      return Response.json({ error: "클릭 수 저장소가 설정되지 않았습니다." }, { status: 503 });
    }
    return Response.json({ id, count });
  } catch (error) {
    console.error("[clicks] 클릭 수 저장 실패", error);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
