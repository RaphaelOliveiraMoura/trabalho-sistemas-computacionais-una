import { CommentPostService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import { InvalidAuthorizationError, InvalidPostError } from '@/domain/errors';
import { CommentPost } from '@/domain/use-cases';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/contracts';
import { BodyValidationError } from '@/presentation/errors';
import { Validation } from '@/validation/contracts';

export class CommentPostController implements Controller {
  constructor(
    private readonly commentPostService: CommentPostService,
    private readonly validator: Validation,
    private readonly authorizationService: AuthorizationService
  ) {}

  async handle(
    httpRequest: HttpRequest<CommentPost.Params>
  ): Promise<HttpResponse<CommentPost.Result | HttpResponseError>> {
    try {
      const { authorization } = httpRequest.headers;
      const user = await this.authorizationService.authorize(authorization);

      const error = this.validator.validate(httpRequest.body);
      if (error) throw new BodyValidationError(error);

      const { id: postId } = httpRequest.params;
      const { text } = httpRequest.body;

      const comment = await this.commentPostService.comment({
        authorId: user.id,
        postId,
        text,
      });

      return ok(comment);
    } catch (error) {
      switch (error.constructor) {
        case InvalidAuthorizationError:
          return unauthorized(error);
        case BodyValidationError:
          return badRequest(error);
        case InvalidPostError:
          return badRequest(error);
        default:
          return serverError(error);
      }
    }
  }
}
