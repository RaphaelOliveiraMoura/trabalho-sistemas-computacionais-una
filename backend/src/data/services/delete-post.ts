import { PostRepository } from '@/data/contracts';
import { InvalidAuthorizationError, InvalidPostError } from '@/domain/errors';
import { DeletePost } from '@/domain/use-cases';

export class DeletePostService implements DeletePost {
  constructor(private readonly postRepository: PostRepository) {}

  async delete(params: DeletePost.Params): Promise<DeletePost.Result> {
    const postExists = await this.postRepository.findById(params.postId);

    if (!postExists) throw new InvalidPostError();

    if (postExists.author.id !== params.authorId) {
      throw new InvalidAuthorizationError(
        'you cannot authorization to this action'
      );
    }

    const post = await this.postRepository.deleteById(params);

    return post;
  }
}
