import { buildAuthorizationService } from '../services/authorization';

import { DeletePostService } from '@/data/services';
import { PostRepository } from '@/infra/repositories';
import { DeletePostController } from '@/presentation/controllers';

export function buildDeletePostController() {
  const postRepository = new PostRepository();
  const deletePostService = new DeletePostService(postRepository);

  const controller = new DeletePostController(
    deletePostService,
    buildAuthorizationService()
  );

  return controller;
}
