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

type CommentPostControllerResponse = {
  id: string;
  text: string;
  author: {
    id: string;
    email: string;
    name: string;
  };
};

export class CommentPostController implements Controller {
  constructor(
    private readonly commentPostService: CommentPostService,
    private readonly validator: Validation,
    private readonly authorizationService: AuthorizationService
  ) {}

  async handle(
    httpRequest: HttpRequest<CommentPost.Params>
  ): Promise<HttpResponse<CommentPostControllerResponse | HttpResponseError>> {
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

      return ok({
        id: comment.id,
        text: comment.text,
        author: {
          id: comment.author.id,
          email: comment.author.email,
          name: comment.author.name,
        },
      });
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
