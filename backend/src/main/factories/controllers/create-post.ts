import { buildAuthorizationService } from '../services/authorization';

import { CreatePostService } from '@/data/services';
import { PostRepository } from '@/infra/repositories';
import { CreatePostController } from '@/presentation/controllers';
import { ValidatorComposite } from '@/validation/composite';
import { RequiredValidator } from '@/validation/validators';

export function buildCreatePostController() {
  const postRepository = new PostRepository();
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
