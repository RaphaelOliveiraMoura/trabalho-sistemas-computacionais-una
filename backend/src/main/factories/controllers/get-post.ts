import { buildAuthorizationService } from '../services/authorization';

import { GetPostService } from '@/data/services/get-post';
import { LocalMemoryPostRepository } from '@/infra/repositories';
import { GetPostController } from '@/presentation/controllers';

export function buildGetPostController() {
  const postRepository = new LocalMemoryPostRepository();
  const getPostService = new GetPostService(postRepository);

  const controller = new GetPostController(
    getPostService,
    buildAuthorizationService()
  );

  return controller;
}
