import { RatePostService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import { InvalidAuthorizationError, InvalidPostError } from '@/domain/errors';
import { RatePost } from '@/domain/use-cases';
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
import { PostViewModel } from '@/presentation/view-models';
import { Validation } from '@/validation/contracts';

export class RatePostController implements Controller {
  constructor(
    private readonly ratePostService: RatePostService,
    private readonly validator: Validation,
    private readonly authorizationService: AuthorizationService
  ) {}

  async handle(
    httpRequest: HttpRequest<RatePost.Params>
  ): Promise<HttpResponse<PostViewModel | HttpResponseError>> {
    try {
      const { authorization } = httpRequest.headers;
      const user = await this.authorizationService.authorize(authorization);

      const error = this.validator.validate(httpRequest.body);
      if (error) throw new BodyValidationError(error);

      const { id: postId } = httpRequest.params;
      const { rating } = httpRequest.body;

      const post = await this.ratePostService.rate({
        userId: user.id,
        postId,
        rating,
      });

      return ok(PostViewModel.parse(post, user.id));
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
