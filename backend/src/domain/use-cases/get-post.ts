import { Post } from '../models';

export interface GetPost {
  get: (params: GetPost.Params) => Promise<GetPost.Result>;
}

export namespace GetPost {
  export type Params = { postId: string };

  export type Result = Post;
}
