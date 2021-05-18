import { ListPostsService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import { InvalidAuthorizationError } from '@/domain/errors';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/contracts';
import { PostViewModel } from '@/presentation/view-models';

export class ListPostsController implements Controller {
  constructor(
    private readonly listPostsService: ListPostsService,
    private readonly authorizationService: AuthorizationService
  ) {}

  async handle(
    httpRequest: HttpRequest
  ): Promise<HttpResponse<PostViewModel[] | HttpResponseError>> {
    try {
      const { authorization } = httpRequest.headers;
      await this.authorizationService.authorize(authorization);

      const posts = await this.listPostsService.list();

      return ok(PostViewModel.parseArray(posts));
    } catch (error) {
      if (error instanceof InvalidAuthorizationError)
        return unauthorized(error);

      return serverError(error);
    }
  }
}
