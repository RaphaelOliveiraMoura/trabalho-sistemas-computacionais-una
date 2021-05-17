import { User } from './user';

export interface PostComment {
  id: string;
  text: string;
  author: User;
  createdAt: Date;
}
