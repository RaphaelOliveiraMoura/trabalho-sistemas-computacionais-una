import { buildAuthorizationService } from '../services/authorization';

import { ListPostsService } from '@/data/services';
import { PostRepository } from '@/infra/repositories';
import { ListPostsController } from '@/presentation/controllers';

export function buildListPostsController() {
  const postRepository = new PostRepository();
  const listPostsService = new ListPostsService(postRepository);

  const controller = new ListPostsController(
    listPostsService,
    buildAuthorizationService()
  );

  return controller;
}
