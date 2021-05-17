import { PostComment } from './comment';
import { PostRating } from './rating';
import { User } from './user';

export interface Post {
  id: string;
  title: string;
  description: string;
  body: string;
  image: string;
  rating: PostRating;
  comments: PostComment[];
  author: User;
  createdAt: Date;
}
