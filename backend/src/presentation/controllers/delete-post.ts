import { DeletePostService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import { InvalidAuthorizationError, InvalidPostError } from '@/domain/errors';
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

export class DeletePostController implements Controller {
  constructor(
    private readonly deletePostService: DeletePostService,
    private readonly authorizationService: AuthorizationService
  ) {}

  async handle(
    httpRequest: HttpRequest
  ): Promise<HttpResponse<HttpResponseError>> {
    try {
      const { authorization } = httpRequest.headers;
      const user = await this.authorizationService.authorize(authorization);

      const { id: postId } = httpRequest.params;

      await this.deletePostService.delete({ postId, authorId: user.id });

      return ok(null);
    } catch (error) {
      switch (error.constructor) {
        case InvalidAuthorizationError:
          return unauthorized(error);
        case InvalidPostError:
          return badRequest(error);
        default:
          return serverError(error);
      }
    }
  }
}
