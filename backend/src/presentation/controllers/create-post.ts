import { CreatePostService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import { InvalidAuthorizationError } from '@/domain/errors';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  created,
  serverError,
  unauthorized,
} from '@/presentation/contracts';
import { BodyValidationError } from '@/presentation/errors';
import { PostViewModel } from '@/presentation/view-models';
import { Validation } from '@/validation/contracts';

export class CreatePostController implements Controller {
  constructor(
    private readonly createPostService: CreatePostService,
    private readonly validator: Validation,
    private readonly authorizationService: AuthorizationService
  ) {}

  async handle(
    httpRequest: HttpRequest
  ): Promise<HttpResponse<PostViewModel | HttpResponseError>> {
    try {
      const { authorization } = httpRequest.headers;
      const user = await this.authorizationService.authorize(authorization);

      const error = this.validator.validate(httpRequest.body);
      if (error) throw new BodyValidationError(error);

      const { body, description, title, image } = httpRequest.body;

      const post = await this.createPostService.create({
        body,
        description,
        title,
        image,
        authorId: user.id,
      });

      return created(PostViewModel.parse(post));
    } catch (error) {
      switch (error.constructor) {
        case InvalidAuthorizationError:
          return unauthorized(error);
        case BodyValidationError:
          return badRequest(error);
        default:
          return serverError(error);
      }
    }
  }
}
