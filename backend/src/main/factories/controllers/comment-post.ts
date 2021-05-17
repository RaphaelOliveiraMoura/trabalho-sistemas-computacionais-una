import { CommentPostService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import {
  LocalMemoryPostRepository,
  LocalMemoryUserRepository,
} from '@/infra/repositories';
import { JWTHasher } from '@/infra/utils';
import { CommentPostController } from '@/presentation/controllers/comment-post';
import { ValidatorComposite } from '@/validation/composite';
import { RequiredValidator } from '@/validation/validators';

export function buildCommentPostController() {
  const postRepository = new LocalMemoryPostRepository();

  const commentPostService = new CommentPostService(postRepository);

  const bodyValidator = new ValidatorComposite([new RequiredValidator('text')]);

  const hasher = new JWTHasher();
  const userRepository = new LocalMemoryUserRepository();
  const authorizationService = new AuthorizationService(userRepository, hasher);

  const controller = new CommentPostController(
    commentPostService,
    bodyValidator,
    authorizationService
  );

  return controller;
}
