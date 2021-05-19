import { Post } from '../models';

export interface ListPosts {
  list: () => Promise<ListPosts.Result>;
}

export namespace ListPosts {
  export type Result = Post[];
}
