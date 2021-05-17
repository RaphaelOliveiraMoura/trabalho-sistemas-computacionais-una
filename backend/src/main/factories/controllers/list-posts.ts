import { ListPostsService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import {
  LocalMemoryPostRepository,
  LocalMemoryUserRepository,
} from '@/infra/repositories';
import { JWTHasher } from '@/infra/utils';
import { ListPostsController } from '@/presentation/controllers/list-posts';

export function buildListPostsController() {
  const postRepository = new LocalMemoryPostRepository();
  const listPostsService = new ListPostsService(postRepository);

  const hasher = new JWTHasher();
  const userRepository = new LocalMemoryUserRepository();
  const authorizationService = new AuthorizationService(userRepository, hasher);

  const controller = new ListPostsController(
    listPostsService,
    authorizationService
  );

  return controller;
}
