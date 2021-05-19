import { buildAuthorizationService } from '../services/authorization';

import { RatePostService } from '@/data/services';
import { PostRepository } from '@/infra/repositories';
import { RatePostController } from '@/presentation/controllers';
import { ValidatorComposite } from '@/validation/composite';
import { RequiredValidator } from '@/validation/validators';

export function buildRatePostController() {
  const postRepository = new PostRepository();

  const ratePostService = new RatePostService(postRepository);

  const bodyValidator = new ValidatorComposite([
    new RequiredValidator('rating'),
  ]);

  const controller = new RatePostController(
    ratePostService,
    bodyValidator,
    buildAuthorizationService()
  );

  return controller;
}
