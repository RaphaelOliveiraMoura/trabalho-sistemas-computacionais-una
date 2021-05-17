import { Post, RatingValues } from '../models';

export interface RatePost {
  rate: (params: RatePost.Params) => Promise<RatePost.Result>;
}

export namespace RatePost {
  export type Params = {
    userId: string;
    postId: string;
    rating: RatingValues;
  };

  export type Result = Post;
}
