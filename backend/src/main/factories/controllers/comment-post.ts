import { buildAuthorizationService } from '../services/authorization';

import { CommentPostService } from '@/data/services';
import { PostRepository } from '@/infra/repositories';
import { CommentPostController } from '@/presentation/controllers';
import { ValidatorComposite } from '@/validation/composite';
import { RequiredValidator } from '@/validation/validators';

export function buildCommentPostController() {
  const postRepository = new PostRepository();

  const commentPostService = new CommentPostService(postRepository);

  const bodyValidator = new ValidatorComposite([new RequiredValidator('text')]);

  const controller = new CommentPostController(
    commentPostService,
    bodyValidator,
    buildAuthorizationService()
  );

  return controller;
}
