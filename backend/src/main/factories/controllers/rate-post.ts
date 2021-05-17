import { RatePostService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import {
  LocalMemoryPostRepository,
  LocalMemoryUserRepository,
} from '@/infra/repositories';
import { JWTHasher } from '@/infra/utils';
import { RatePostController } from '@/presentation/controllers/rate-post';
import { ValidatorComposite } from '@/validation/composite';
import { RequiredValidator } from '@/validation/validators';

export function buildRatePostController() {
  const postRepository = new LocalMemoryPostRepository();

  const ratePostService = new RatePostService(postRepository);

  const bodyValidator = new ValidatorComposite([
    new RequiredValidator('rating'),
  ]);

  const hasher = new JWTHasher();
  const userRepository = new LocalMemoryUserRepository();
  const authorizationService = new AuthorizationService(userRepository, hasher);

  const controller = new RatePostController(
    ratePostService,
    bodyValidator,
    authorizationService
  );

  return controller;
}
