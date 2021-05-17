import { PostRepository } from '@/data/contracts';
import { ListPosts } from '@/domain/use-cases';

export class ListPostsService implements ListPosts {
  constructor(private readonly postRepository: PostRepository) {}

  async list(): Promise<ListPosts.Result> {
    const posts = await this.postRepository.findAll();
    return posts;
  }
}
