import { getClicksCollection } from "@/lib/mongodb";
import { profile } from "@/data/profile";

const linkIds = new Set(profile.links.map((link) => link.id));

// 해당 링크의 클릭 수를 1 늘리고, 늘어난 값을 돌려줍니다.
export async function POST(_req: Request, ctx: RouteContext<"/api/clicks/[id]">) {
  const { id } = await ctx.params;

  // 등록된 링크만 집계해서 아무 id나 DB에 쌓이지 않게 합니다.
  if (!linkIds.has(id)) {
    return Response.json({ error: "존재하지 않는 링크입니다." }, { status: 404 });
  }

  try {
    const clicks = await getClicksCollection();
    const doc = await clicks.findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ id, count: doc?.count ?? 1 });
  } catch (err) {
    console.error(`[POST /api/clicks/${id}]`, err);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
