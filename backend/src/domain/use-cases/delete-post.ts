export interface DeletePost {
  delete: (params: DeletePost.Params) => Promise<DeletePost.Result>;
}

export namespace DeletePost {
  export type Params = {
    postId: string;
    authorId: string;
  };

  export type Result = boolean;
}
