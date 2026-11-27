import { connection } from "next/server";
import { getClicksCollection } from "@/lib/mongodb";
import { profile } from "@/data/profile";

// 모든 링크의 현재 클릭 수를 한 번에 돌려줍니다. 예: { "github": 42, "velog": 3 }
export async function GET() {
  // 빌드 시 미리 렌더링하지 않고 요청마다 DB에서 읽도록 합니다.
  await connection();

  try {
    const ids = profile.links.map((link) => link.id);
    const clicks = await getClicksCollection();
    const docs = await clicks.find({ _id: { $in: ids } }).toArray();

    const counts: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;

    return Response.json(counts, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[GET /api/clicks]", err);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
