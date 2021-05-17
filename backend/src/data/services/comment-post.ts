import { PostRepository } from '@/data/contracts';
import { InvalidPostError } from '@/domain/errors';
import { CommentPost } from '@/domain/use-cases';

export class CommentPostService implements CommentPost {
  constructor(private readonly postRepository: PostRepository) {}

  async comment(params: CommentPost.Params): Promise<CommentPost.Result> {
    const postExists = await this.postRepository.findById(params.postId);

    if (!postExists) throw new InvalidPostError();

    const postWithComment = await this.postRepository.createComment(params);

    return postWithComment;
  }
}
