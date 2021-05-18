import { PostRepository } from '@/data/contracts';
import { InvalidPostError } from '@/domain/errors';
import { GetPost } from '@/domain/use-cases';

export class GetPostService implements GetPost {
  constructor(private readonly postRepository: PostRepository) {}

  async get(params: GetPost.Params): Promise<GetPost.Result> {
    const post = await this.postRepository.findById(params.postId);

    if (!post) throw new InvalidPostError();

    return post;
  }
}
