import { AuthorizationService } from '@/data/services/authorization';
import { GetPostService } from '@/data/services/get-post';
import { InvalidPostError } from '@/domain/errors';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  serverError,
  ok,
} from '@/presentation/contracts';
import { BodyValidationError } from '@/presentation/errors';
import { PostViewModel } from '@/presentation/view-models';

export class GetPostController implements Controller {
  constructor(
    private readonly getPostService: GetPostService,
    private readonly authorizationService: AuthorizationService
  ) {}

  async handle(
    httpRequest: HttpRequest
  ): Promise<HttpResponse<PostViewModel | HttpResponseError>> {
    try {
      const { authorization } = httpRequest.headers;
      const user = await this.isAuthenticated(authorization);

      const { id: postId } = httpRequest.params;

      const post = await this.getPostService.get({ postId });

      if (!user) {
        return ok(PostViewModel.parse(post));
      }

      return ok(PostViewModel.parse(post, user.id));
    } catch (error) {
      switch (error.constructor) {
        case InvalidPostError:
          return badRequest(error);
        case BodyValidationError:
          return badRequest(error);
        default:
          return serverError(error);
      }
    }
  }

  async isAuthenticated(authorization: string) {
    try {
      return await this.authorizationService.authorize(authorization);
    } catch (error) {
      return null;
    }
  }
}
