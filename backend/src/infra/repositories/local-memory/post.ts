import { LocalMemoryPostEntity, LocalMemoryUserEntity } from './entities';
import { users } from './user';

import { PostRepository } from '@/data/contracts';
import { Post, PostComment, PostRating } from '@/domain/models';
import { CommentPost, CreatePost, RatePost } from '@/domain/use-cases';

const posts: Array<LocalMemoryPostEntity> = [];

export class LocalMemoryPostRepository implements PostRepository {
  private parse(post: LocalMemoryPostEntity): Post {
    const ratingSum = post.rating.reduce((acc, curr) => acc + curr.value, 0);
    const ratingAvg = ratingSum / post.rating.length || 0;

    return { ...post, rating: { value: ratingAvg } as PostRating };
  }

  async count(): Promise<number> {
    return posts.length;
  }

  async findById(postId: string): Promise<Post | null> {
    const post = posts.find(({ id }) => id === postId);

    if (!post) return null;

    return this.parse(post);
  }

  async findAll(): Promise<Post[]> {
    return posts.map(this.parse);
  }

  async create(params: CreatePost.Params): Promise<Post> {
    const author = users.find(({ id }) => id === params.authorId);

    if (!author) throw new Error(`Invalid Author with id: ${params.authorId}`);

    const post: LocalMemoryPostEntity = {
      ...params,
      id: String(posts.length + 1),
      comments: [],
      rating: [],
      createdAt: new Date(),
      author: LocalMemoryUserEntity.unparse(author),
    };

    posts.push(post);

    return this.parse(post);
  }

  async createComment(params: CommentPost.Params): Promise<PostComment> {
    const author = users.find(({ id }) => params.authorId === id);

    const postIndex = posts.findIndex(({ id }) => id === params.postId);

    const comment: PostComment = {
      id: Math.random().toString(),
      text: params.text,
      author: LocalMemoryUserEntity.unparse(author),
      createdAt: new Date(),
    };

    posts[postIndex].comments.push(comment);

    return comment;
  }

  async createRating(params: RatePost.Params): Promise<Post> {
    const postIndex = posts.findIndex(({ id }) => id === params.postId);

    const rating = { value: params.rating, authorId: params.userId };

    const ratingIndex = posts[postIndex].rating.findIndex(
      ({ authorId }) => authorId === params.userId
    );

    if (ratingIndex >= 0) posts[postIndex].rating.splice(ratingIndex, 1);

    posts[postIndex].rating.push(rating);

    return this.parse(posts[postIndex]);
  }

  async deleteAll(): Promise<boolean> {
    posts.splice(0, posts.length);
    return true;
  }
}
