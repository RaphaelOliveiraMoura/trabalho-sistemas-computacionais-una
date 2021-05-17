import { buildAuthorizationService } from '../services/authorization';

import { CreatePostService } from '@/data/services';
import { LocalMemoryPostRepository } from '@/infra/repositories';
import { CreatePostController } from '@/presentation/controllers';
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

  const controller = new CreatePostController(
    createPostService,
    bodyValidator,
    buildAuthorizationService()
  );

  return controller;
}
