import { Post, PostComment } from '@/domain/models';
import { CommentPost, CreatePost, RatePost } from '@/domain/use-cases';

export interface PostRepository {
  count: () => Promise<number>;

  findById: (postId: string) => Promise<Post | null>;

  findAll: () => Promise<Post[] | null>;

  create: (params: CreatePost.Params) => Promise<Post>;

  createComment: (params: CommentPost.Params) => Promise<PostComment>;

  createRating: (params: RatePost.Params) => Promise<Post>;

  deleteAll: () => Promise<boolean>;
}
