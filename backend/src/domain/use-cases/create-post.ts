import { Post } from '../models';

export interface CreatePost {
  create: (params: CreatePost.Params) => Promise<CreatePost.Result>;
}

export namespace CreatePost {
  export type Params = {
    authorId: string;
    title: string;
    description: string;
    body: string;
    image: string;
  };

  export type Result = Post;
}
