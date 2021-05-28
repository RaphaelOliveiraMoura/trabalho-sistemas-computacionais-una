import { ListPostsService } from '@/data/services';
import { AuthorizationService } from '@/data/services/authorization';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  ok,
  serverError,
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
      const user = await this.isAuthenticated(authorization);

      const posts = await this.listPostsService.list();

      if (!user) {
        return ok(PostViewModel.parseArray(posts));
      }

      return ok(PostViewModel.parseArray(posts, user.id));
    } catch (error) {
      return serverError(error);
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
