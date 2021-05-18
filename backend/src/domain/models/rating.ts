export type RatingValues = 0 | 1 | 2 | 3 | 4 | 5;

export interface PostRating {
  author: {
    id: string;
    email: string;
    name: string;
  };
  value: RatingValues;
}
