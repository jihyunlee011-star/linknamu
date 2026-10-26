import "server-only";
import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB ?? "linknamu";

// 개발 중 HMR이나 서버리스 재사용 시 연결이 계속 늘어나지 않도록 전역에 캐시합니다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

/** MONGODB_URI가 없으면 null을 반환합니다. (클릭 수 없이도 페이지는 동작) */
export async function getDb(): Promise<Db | null> {
  if (!uri) return null;
  globalForMongo._mongoClientPromise ??= new MongoClient(uri).connect();
  const client = await globalForMongo._mongoClientPromise;
  return client.db(dbName);
}
