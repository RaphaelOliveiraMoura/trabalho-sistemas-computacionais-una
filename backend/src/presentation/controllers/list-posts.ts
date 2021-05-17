import { ListPostsService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import { InvalidAuthorizationError } from '@/domain/errors';
import { ListPosts } from '@/domain/use-cases';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/contracts';

export class ListPostsController implements Controller {
  constructor(
    private readonly listPostsService: ListPostsService,
    private readonly authorizationService: AuthorizationService
  ) {}

  async handle(
    httpRequest: HttpRequest
  ): Promise<HttpResponse<ListPosts.Result | HttpResponseError>> {
    try {
      const { authorization } = httpRequest.headers;
      await this.authorizationService.authorize(authorization);

      const posts = await this.listPostsService.list();

      return ok(posts);
    } catch (error) {
      if (error instanceof InvalidAuthorizationError)
        return unauthorized(error);

      return serverError(error);
    }
  }
}
