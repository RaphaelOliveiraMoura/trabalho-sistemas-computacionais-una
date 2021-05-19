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

  author: {
    id: string;
    email: string;
    name: string;
  };

  static parse(post: Post, currentUserId: string): PostViewModel {
    const ratingSum = post.rating.reduce((acc, curr) => acc + curr.value, 0);
    const ratingAvg = ratingSum / post.rating.length || 0;

    const ratingCurrent = post.rating.find(
      ({ authorId }) => authorId === currentUserId
    );

    return JSON.parse(
      JSON.stringify({
        id: String(post.id),
        title: post.title,
        description: post.description,
        body: post.body,
        image: post.image,
        createdAt: post.createdAt.toISOString(),
        comments: post.comments
          ? post.comments.map((comment) => ({
              id: String(comment.id),
              text: comment.text,
              author: {
                id: String(comment.author.id),
                name: comment.author.name,
                email: comment.author.email,
              },
            }))
          : undefined,
        rating: {
          total: Number(ratingAvg),
          current: ratingCurrent ? Number(ratingCurrent.value) : null,
        },
        author: {
          id: String(post.author.id),
          name: post.author.name,
          email: post.author.email,
        },
      })
    );
  }

  static parseArray(
    posts: ListPosts.Result,
    currentUserId: string
  ): PostViewModel[] {
    return posts.map((post) => this.parse(post, currentUserId));
  }
}
