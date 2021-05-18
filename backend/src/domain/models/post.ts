import { PostComment } from './comment';
import { PostRating } from './rating';

export interface Post {
  id: string;
  title: string;
  description: string;
  body: string;
  image: string;
  rating: PostRating[];
  comments: PostComment[];
  author: {
    id: string;
    email: string;
    name: string;
  };
  createdAt: Date;
}
