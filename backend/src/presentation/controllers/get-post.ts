import { AuthorizationService } from '@/data/services/authorization';
import { GetPostService } from '@/data/services/get-post';
import { InvalidAuthorizationError, InvalidPostError } from '@/domain/errors';
import { CreatePost } from '@/domain/use-cases';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  serverError,
  unauthorized,
  ok,
} from '@/presentation/contracts';
import { BodyValidationError } from '@/presentation/errors';

export class GetPostController implements Controller {
  constructor(
    private readonly getPostService: GetPostService,
    private readonly authorizationService: AuthorizationService
  ) {}

  async handle(
    httpRequest: HttpRequest
  ): Promise<HttpResponse<CreatePost.Result | HttpResponseError>> {
    try {
      const { authorization } = httpRequest.headers;
      await this.authorizationService.authorize(authorization);

      const { id: postId } = httpRequest.params;

      const post = await this.getPostService.get({
        postId,
      });

      return ok(post);
    } catch (error) {
      switch (error.constructor) {
        case InvalidAuthorizationError:
          return unauthorized(error);
        case InvalidPostError:
          return badRequest(error);
        case BodyValidationError:
          return badRequest(error);
        default:
          return serverError(error);
      }
    }
  }
}
