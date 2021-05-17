import { PostComment } from '../models';

export interface CommentPost {
  comment: (params: CommentPost.Params) => Promise<CommentPost.Result>;
}

export namespace CommentPost {
  export type Params = {
    authorId: string;
    postId: string;
    text: string;
  };

  export type Result = PostComment;
}
