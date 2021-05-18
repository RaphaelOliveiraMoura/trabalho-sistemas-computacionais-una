import { UserViewModel } from './user';

import { Post } from '@/domain/models';
import { ListPosts } from '@/domain/use-cases';

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
    current: number | null;
  };

  author: Partial<UserViewModel>;

  static parse(post: Post, currentUserId: string): PostViewModel {
    const ratingSum = post.rating.reduce((acc, curr) => acc + curr.value, 0);
    const ratingAvg = ratingSum / post.rating.length || 0;

    const ratingCurrent = post.rating.find(
      ({ author }) => author.id === currentUserId
    );

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
        total: ratingAvg,
        current: ratingCurrent ? ratingCurrent.value : null,
      },
      author: UserViewModel.parse(post.author),
    };
  }

  static parseArray(
    posts: ListPosts.Result,
    currentUserId: string
  ): PostViewModel[] {
    return posts.map((post) => {
      const ratingSum = post.rating.reduce((acc, curr) => acc + curr.rating, 0);
      const ratingAvg = ratingSum / post.rating.length || 0;

      const ratingCurrent = post.rating.find(
        ({ authorId }) => authorId === currentUserId
      );

      return {
        id: post.id,
        title: post.title,
        description: post.description,
        body: post.body,
        image: post.image,
        createdAt: post.createdAt.toISOString(),
        rating: {
          total: ratingAvg,
          current: ratingCurrent ? ratingCurrent.rating : null,
        },
        author: UserViewModel.parse(post.author),
      };
    });
  }
}
