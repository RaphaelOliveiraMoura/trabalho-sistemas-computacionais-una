import { CreatePostService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import {
  LocalMemoryPostRepository,
  LocalMemoryUserRepository,
} from '@/infra/repositories';
import { JWTHasher } from '@/infra/utils';
import { CreatePostController } from '@/presentation/controllers/create-post';
import { ValidatorComposite } from '@/validation/composite';
import { RequiredValidator } from '@/validation/validators';

export function buildCreatePostController() {
  const postRepository = new LocalMemoryPostRepository();
  const createPostService = new CreatePostService(postRepository);

  const bodyValidator = new ValidatorComposite([
    new RequiredValidator('title'),
    new RequiredValidator('description'),
    new RequiredValidator('body'),
    new RequiredValidator('image'),
  ]);

  const hasher = new JWTHasher();
  const userRepository = new LocalMemoryUserRepository();
  const authorizationService = new AuthorizationService(userRepository, hasher);

  const controller = new CreatePostController(
    createPostService,
    bodyValidator,
    authorizationService
  );

  return controller;
}
