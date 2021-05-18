export interface ListPosts {
  list: () => Promise<ListPosts.Result>;
}

export namespace ListPosts {
  export type Result = Array<{
    id: string;
    title: string;
    description: string;
    body: string;
    image: string;
    rating: Array<{
      authorId: string;
      rating: number;
    }>;
    author: {
      id: string;
      name: string;
      email: string;
    };
    createdAt: Date;
  }>;
}
