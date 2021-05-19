import { UserRepository } from '..';

import { PostRepository } from '@/data/contracts';
import { Post, PostComment } from '@/domain/models';
import { CommentPost, CreatePost, RatePost } from '@/domain/use-cases';

const posts: Array<Post> = [];

export class LocalMemoryPostRepository implements PostRepository {
  async count(): Promise<number> {
    return posts.length;
  }

  async findById(postId: string): Promise<Post | null> {
    const post = posts.find(({ id }) => id === postId);

    if (!post) return null;

    return post;
  }

  async findAll(): Promise<Post[]> {
    return posts.map(({ comments: _, ...post }) => post);
  }

  async create(params: CreatePost.Params): Promise<Post> {
    const author = await new UserRepository().findById(params.authorId);

    if (!author) throw new Error(`Invalid Author with id: ${params.authorId}`);

    const post = {
      ...params,
      id: String(posts.length + 1),
      author,
      comments: [],
      rating: [],
      createdAt: new Date(),
    };

    posts.push(post);

    return post;
  }

  async createComment(params: CommentPost.Params): Promise<PostComment> {
    const author = await new UserRepository().findById(params.authorId);

    const postIndex = posts.findIndex(({ id }) => id === params.postId);

    const comment: PostComment = {
      id: Math.random().toString(),
      text: params.text,
      author,
      createdAt: new Date(),
    };

    posts[postIndex].comments.push(comment);

    return comment;
  }

  async createRating(params: RatePost.Params): Promise<Post> {
    const postIndex = posts.findIndex(({ id }) => id === params.postId);

    const rating = {
      value: params.rating,
      authorId: params.userId,
    };

    const ratingIndex = posts[postIndex].rating.findIndex(
      ({ authorId }) => authorId === params.userId
    );

    if (ratingIndex >= 0) posts[postIndex].rating.splice(ratingIndex, 1);

    posts[postIndex].rating.push(rating);

    return posts[postIndex];
  }

  async deleteAll(): Promise<boolean> {
    posts.splice(0, posts.length);
    return true;
  }
}
