import { UserViewModel } from './user';

import { Post } from '@/domain/models';

export class PostViewModel {
  id: string;
  title: string;
  description: string;
  image: string;
  body: string;
  createdAt: string;

  comments?: Array<{
    text: string;
  }>;

  rating: {
    total: number;
  };

  author: UserViewModel;

  static parse(post: Post): PostViewModel {
    return {
      id: post.id,
      title: post.title,
      description: post.description,
      body: post.body,
      image: post.image,
      createdAt: post.createdAt.toISOString(),
      comments: post.comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        author: UserViewModel.parse(comment.author),
      })),
      rating: {
        total: post.rating.value,
      },
      author: UserViewModel.parse(post.author),
    };
  }

  static parseArray(posts: Post[]): PostViewModel[] {
    return posts.map((post) => {
      const parsedPost = PostViewModel.parse(post);
      delete parsedPost.comments;
      return parsedPost;
    });
  }
}
