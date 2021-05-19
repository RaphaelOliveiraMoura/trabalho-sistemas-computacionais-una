export interface PostComment {
  id: string;
  text: string;
  author: {
    id: string;
    email: string;
    name: string;
  };
  createdAt: Date;
}
