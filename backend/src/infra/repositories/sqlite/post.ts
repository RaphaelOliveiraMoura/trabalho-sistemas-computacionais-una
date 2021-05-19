import { Database } from 'sqlite';

import { UserRepository } from '..';

import { mapComment, mapRating } from './utils/mappers';

import { SQLiteDatabase } from '.';
import { PostRepository } from '@/data/contracts';
import { Post, PostComment } from '@/domain/models';
import { CommentPost, CreatePost, RatePost } from '@/domain/use-cases';

export class SQLitePostRepository implements PostRepository {
  db: Database;

  constructor() {
    this.db = SQLiteDatabase.getInstance();
  }

  async count(): Promise<number> {
    const result = await this.db.get('SELECT COUNT(*) as total FROM posts');
    return result.total;
  }

  async findById(postId: string): Promise<Post | null> {
    const result = await this.db.get(
      'SELECT rowid, * FROM posts WHERE rowid = ?',
      postId
    );

    if (!result) return null;

    const comments = await this.db.all(
      'SELECT pc.rowid as id, pc.text as text, pc.created_at as created_at, u.rowid as author_id, u.email as author_email, u.name as author_name FROM post_comments as pc LEFT JOIN users as u ON u.rowid = pc.author_id WHERE pc.post_id = ?',
      postId
    );

    const rating = await this.db.all(
      'SELECT pr.rating, u.rowid as author_id, u.email as author_email, u.name as author_name FROM post_ratings as pr LEFT JOIN users as u ON u.rowid = pr.author_id WHERE pr.post_id = ?',
      postId
    );

    const author = await new UserRepository().findById(result.author_id);

    return {
      id: String(result.rowid),
      title: result.title,
      description: result.description,
      body: result.body,
      image: result.image,
      comments: comments.map(mapComment),
      rating: rating.map(mapRating),
      author,
      createdAt: new Date(result.created_at),
    } as Post;
  }

  async findAll(): Promise<Post[]> {
    const results = await this.db.all(
      `
      SELECT 
        p.rowid as id,
        p.title as title,
        p.description as description,
        p.body as body,
        p.image as image,
        p.created_at as created_at,
    
        u.rowid as author_id,
        u.name as author_name,
        u.email as author_email,
        
        pr.rating as rating,
        pr.author_id as rating_author_id
      FROM posts as p
      LEFT JOIN users as u ON u.rowid = p.author_id
      LEFT JOIN post_ratings as pr ON pr.post_id = p.rowid
      `
    );

    const posts = [];

    results.forEach((row) => {
      const postIndex = posts.find(({ id }) => String(row.id) === id);

      if (postIndex >= 0) {
        posts[postIndex].rating.push({
          rating: row.rating,
          authorId: row.rating_author_id,
        });
      } else {
        posts.push({
          id: row.id,
          title: row.title,
          description: row.description,
          body: row.body,
          image: row.image,
          createdAt: new Date(row.created_at),
          author: {
            id: row.author_id,
            name: row.author_name,
            email: row.author_email,
          },
          rating: row.rating
            ? [{ rating: row.rating, authorId: row.rating_author_id }]
            : [],
        });
      }
    });

    return posts;
  }

  async create({
    authorId,
    title,
    description,
    body,
    image,
  }: CreatePost.Params): Promise<Post> {
    const author = await new UserRepository().findById(authorId);

    if (!author) throw new Error(`Invalid Author with id: ${authorId}`);

    const result = await this.db.run(
      'INSERT INTO posts (author_id, title, description, body, image, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      authorId,
      title,
      description,
      body,
      image,
      new Date().toISOString()
    );

    return this.findById(String(result.lastID));
  }

  async createComment({
    authorId,
    postId,
    text,
  }: CommentPost.Params): Promise<PostComment> {
    const author = await new UserRepository().findById(authorId);

    if (!author) throw new Error(`Invalid Author with id: ${authorId}`);

    const createdAt = new Date();

    const result = await this.db.run(
      'INSERT INTO post_comments (author_id, post_id, text, created_at) VALUES (?, ?, ?, ?)',
      authorId,
      postId,
      text,
      createdAt.toISOString()
    );

    return {
      id: String(result.lastID),
      author,
      text,
      createdAt,
    };
  }

  async createRating({
    userId,
    postId,
    rating,
  }: RatePost.Params): Promise<Post> {
    const author = await new UserRepository().findById(userId);

    if (!author) throw new Error(`Invalid Author with id: ${userId}`);

    const userAlreadyRate = await this.db.get(
      `SELECT rowid FROM post_ratings WHERE post_id = ? AND author_id = ?`,
      postId,
      userId
    );

    if (userAlreadyRate) {
      await this.db.run(
        'UPDATE post_ratings SET rating = ? WHERE author_id = ? AND post_id = ?',
        rating,
        userId,
        postId
      );
    } else {
      await this.db.run(
        'INSERT INTO post_ratings (author_id, post_id, rating, created_at) VALUES (?, ?, ?, ?)',
        userId,
        postId,
        rating,
        new Date().toISOString()
      );
    }

    const post = await this.findById(postId);

    return post;
  }

  async deleteAll(): Promise<boolean> {
    await this.db.run('DELETE FROM post_comments');
    await this.db.run('DELETE FROM post_ratings');
    await this.db.run('DELETE FROM posts');
    return true;
  }
}
