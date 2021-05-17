import { UserAlreadyExistsError } from '@/domain/errors';
import { SignUp } from '@/domain/use-cases';
import {
  badRequest,
  Controller,
  HttpRequest,
  HttpResponse,
  HttpResponseError,
  ok,
  serverError,
} from '@/presentation/contracts';
import { BodyValidationError } from '@/presentation/errors';
import { UserViewModel } from '@/presentation/view-models';
import { Validation } from '@/validation/contracts';

export class SignUpController implements Controller {
  constructor(
    private readonly signUpService: SignUp,
    private readonly validator: Validation
  ) {}

  async handle(
    httpRequest: HttpRequest<SignUp.Params>
  ): Promise<HttpResponse<UserViewModel | HttpResponseError>> {
    try {
      const error = this.validator.validate(httpRequest.body);

      if (error) throw new BodyValidationError(error);

      const createdUser = await this.signUpService.signUp(httpRequest.body);

      return ok(UserViewModel.parse(createdUser));
    } catch (error) {
      if (error instanceof BodyValidationError) return badRequest(error);
      if (error instanceof UserAlreadyExistsError) return badRequest(error);
      return serverError(error);
    }
  }
}
