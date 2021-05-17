import { PostRepository } from '@/data/contracts';
import { InvalidPostError } from '@/domain/errors';
import { RatePost } from '@/domain/use-cases';

export class RatePostService implements RatePost {
  constructor(private readonly postRepository: PostRepository) {}

  async rate(params: RatePost.Params): Promise<RatePost.Result> {
    const postExists = await this.postRepository.findById(params.postId);

    if (!postExists) throw new InvalidPostError();

    const post = await this.postRepository.createRating(params);

    return post;
  }
}
