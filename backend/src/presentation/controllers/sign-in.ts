import { SignInService } from '@/data/services/sign-in';
import { InvalidCredentialsError } from '@/domain/errors';
import { SignIn } from '@/domain/use-cases';
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

export class SignInController implements Controller {
  constructor(
    private readonly signInService: SignInService,
    private readonly validator: Validation
  ) {}

  async handle(
    httpRequest: HttpRequest<SignIn.Params>
  ): Promise<HttpResponse<SignIn.Result | HttpResponseError>> {
    try {
      const error = this.validator.validate(httpRequest.body);
      if (error) throw new BodyValidationError(error);

      const { email, password } = httpRequest.body;

      const { token, name } = await this.signInService.signIn({
        email,
        password,
      });

      return ok({ token, email, name });
    } catch (error) {
      switch (error.constructor) {
        case InvalidCredentialsError:
          return unauthorized(error);
        case BodyValidationError:
          return badRequest(error);
        default:
          return serverError(error);
      }
    }
  }
}
