import { PostRepository } from '@/data/contracts';
import { CreatePost } from '@/domain/use-cases';

export class CreatePostService implements CreatePost {
  constructor(private readonly postRepository: PostRepository) {}

  async create(params: CreatePost.Params): Promise<CreatePost.Result> {
    const post = await this.postRepository.create(params);
    return post;
  }
}
