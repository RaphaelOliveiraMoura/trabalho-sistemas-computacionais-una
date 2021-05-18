import { SQLiteDatabase } from '@/infra/repositories/sqlite';

export async function setupDatabase() {
  await SQLiteDatabase.initialize();
}
