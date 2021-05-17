import { Post, PostRating } from '@/domain/models';

type Rating = PostRating & { authorId: string };

export type LocalMemoryPostEntity = Omit<Post, 'rating'> & {
  rating: Rating[];
};
