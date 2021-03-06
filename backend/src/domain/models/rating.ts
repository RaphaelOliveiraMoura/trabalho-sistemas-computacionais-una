export type RatingValues = 0 | 1 | 2 | 3 | 4 | 5;

export interface PostRating {
  authorId: string;
  value: RatingValues;
}
