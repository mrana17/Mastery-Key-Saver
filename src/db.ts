import { Collection, Db, MongoClient } from "mongodb";
import { type } from "os";

export type PasswordDoc = {
  name: string;
  value: string;
};
let client: MongoClient = null;
let db: Db = null;

export async function connectDB(url: string, dbName: string) {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  const db = client.db(dbName);
}

export function getCollection<T>(collectionName: string): Collection<T> {
  return db.collection<T>(collectionName);
}

export function closeDB() {
  client.close();
}

export async function createPasswordDoc(PasswordDoc: PasswordDoc) {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  return await passwordCollection.insertOne(PasswordDoc);
}

export async function readPasswordDoc(passwordName: string) {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  return await passwordCollection.findOne({ name: passwordName });
}

export async function updatePasswordDoc(
  passwordName: string,
  passwordDoc: PasswordDoc
) {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  return await passwordCollection.updateOne(
    { passwordName },
    { $set: passwordDoc }
  );
}

export async function deletePasswordDoc(PasswordDoc: PasswordDoc) {
  const passwordCollection = await getCollection<PasswordDoc>("passwords");
  return await passwordCollection.deleteOne(PasswordDoc);
}
