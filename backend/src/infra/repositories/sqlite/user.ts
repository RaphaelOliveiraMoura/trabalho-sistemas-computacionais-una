import { Database } from 'sqlite';

import { SQLiteDatabase } from '.';
import { UserRepository } from '@/data/contracts';
import { User } from '@/domain/models';
import { SignUp } from '@/domain/use-cases';

export class SQLiteUserRepository implements UserRepository {
  db: Database;

  constructor() {
    this.db = SQLiteDatabase.getInstance();
  }

  async count(): Promise<number> {
    const result = await this.db.get('SELECT COUNT(*) as total FROM users');
    return result.total;
  }

  async create({ email, name, password }: SignUp.Params): Promise<User> {
    const result = await this.db.run(
      'INSERT INTO users (email, name, password, created_at) VALUES (?, ?, ?, ?)',
      email,
      name,
      password,
      new Date().toISOString()
    );

    return {
      id: String(result.lastID),
      email,
      name,
      password,
      createdAt: new Date(),
    };
  }

  async findById(userId: string): Promise<User> {
    const result = await this.db.get(
      'SELECT rowid, * FROM users WHERE rowid = ?',
      userId
    );

    if (!result) return null;

    return {
      id: result.rowid,
      email: result.email,
      name: result.name,
      password: result.password,
      createdAt: new Date(result.created_at),
    };
  }

  async findByEmail(email: string): Promise<User> {
    const result = await this.db.get(
      'SELECT rowid, * FROM users WHERE email = ?',
      email
    );

    if (!result) return null;

    return {
      id: result.rowid,
      email: result.email,
      name: result.name,
      password: result.password,
      createdAt: new Date(result.created_at),
    };
  }

  async deleteAll(): Promise<boolean> {
    await this.db.run('DELETE FROM users');
    return true;
  }
}
