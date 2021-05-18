import { UserRepository } from '..';

import { LocalMemoryPostEntity } from './entities';

import { PostRepository } from '@/data/contracts';
import { Post, PostComment } from '@/domain/models';
import {
  CommentPost,
  CreatePost,
  ListPosts,
  RatePost,
} from '@/domain/use-cases';

const posts: Array<LocalMemoryPostEntity> = [];

export class LocalMemoryPostRepository implements PostRepository {
  async count(): Promise<number> {
    return posts.length;
  }

  async findById(postId: string): Promise<Post | null> {
    const post = posts.find(({ id }) => id === postId);

    if (!post) return null;

    return post;
  }

  async findAll(): Promise<ListPosts.Result> {
    return posts.map((post) => ({
      id: post.id,
      title: post.title,
      description: post.description,
      body: post.body,
      image: post.image,
      createdAt: post.createdAt,
      author: {
        id: post.author.id,
        email: post.author.email,
        name: post.author.name,
      },
      rating: post.rating.map(({ author, value }) => ({
        authorId: author.id,
        rating: value,
      })),
    }));
  }

  async create(params: CreatePost.Params): Promise<Post> {
    const author = await new UserRepository().findById(params.authorId);

    if (!author) throw new Error(`Invalid Author with id: ${params.authorId}`);

    const post: LocalMemoryPostEntity = {
      ...params,
      id: String(posts.length + 1),
      comments: [],
      rating: [],
      createdAt: new Date(),
      author,
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

    const author = await new UserRepository().findById(params.userId);

    const rating = {
      value: params.rating,
      author,
    };

    const ratingIndex = posts[postIndex].rating.findIndex(
      ({ author: { id } }) => id === params.userId
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
