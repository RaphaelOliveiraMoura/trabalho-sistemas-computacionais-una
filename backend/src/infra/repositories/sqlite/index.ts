import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';

export class SQLiteDatabase {
  private static db: Database;

  private constructor() {}

  static async runMigrations() {
    await this.db.exec(
      `
      CREATE TABLE IF NOT EXISTS users (
        name TEXT, 
        email TEXT, 
        password TEXT, 
        created_at DATE
      );
      
      CREATE TABLE IF NOT EXISTS posts (
        author_id INTEGER,
        title TEXT, 
        description TEXT, 
        body TEXT, 
        image TEXT,
        created_at DATE,
        FOREIGN KEY(author_id) REFERENCES users(rowid)
      );
  
      CREATE TABLE IF NOT EXISTS post_ratings (
        post_id INTEGER, 
        author_id INTEGER, 
        rating TEXT,
        created_at DATE,
        FOREIGN KEY(post_id) REFERENCES posts(rowid),
        FOREIGN KEY(author_id) REFERENCES users(rowid)
      );
  
      CREATE TABLE IF NOT EXISTS post_comments (
        post_id INTEGER, 
        author_id INTEGER, 
        text TEXT, 
        created_at DATE,
        FOREIGN KEY(post_id) REFERENCES posts(rowid),
        FOREIGN KEY(author_id) REFERENCES users(rowid)
      );
      `
    );
  }

  static async initialize() {
    sqlite3.verbose();

    this.db = await open({
      filename: './database.db',
      driver: sqlite3.Database,
    });

    await this.runMigrations();
  }

  static getInstance() {
    if (!this.db) {
      throw new Error('SQLite database not initialized');
    }

    return this.db;
  }
}
