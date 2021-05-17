import { AuthorizationService } from '@/data/services/authorization';
import { GetPostService } from '@/data/services/get-post';
import {
  LocalMemoryPostRepository,
  LocalMemoryUserRepository,
} from '@/infra/repositories';
import { JWTHasher } from '@/infra/utils';
import { GetPostController } from '@/presentation/controllers/get-post';

export function buildGetPostController() {
  const postRepository = new LocalMemoryPostRepository();
  const getPostService = new GetPostService(postRepository);

  const hasher = new JWTHasher();
  const userRepository = new LocalMemoryUserRepository();
  const authorizationService = new AuthorizationService(userRepository, hasher);

  const controller = new GetPostController(
    getPostService,
    authorizationService
  );

  return controller;
}
