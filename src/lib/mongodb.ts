import { MongoClient } from "mongodb";

// 링크별 클릭 수 문서: { _id: 링크 id, count: 숫자 }
export type ClickDoc = { _id: string; count: number };

const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

// 연결은 한 번만 만들고 재사용합니다.
// 개발 모드에서는 코드가 바뀔 때마다 모듈이 다시 로드되므로 globalThis에 보관합니다.
function getClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. .env.local을 확인하세요.");
    }
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 연결에 실패하면 다음 요청에서 다시 시도할 수 있도록 캐시를 비웁니다.
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

export async function getClicksCollection() {
  const client = await getClient();
  // 데이터베이스 이름은 연결 문자열의 경로(/linknamu)를 따릅니다.
  return client.db().collection<ClickDoc>("clicks");
}
