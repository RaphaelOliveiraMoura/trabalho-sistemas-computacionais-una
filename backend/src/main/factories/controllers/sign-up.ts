import { CreateUserService } from '@/data/services';
import { UserRepository } from '@/infra/repositories';
import { BcryptEncrypter } from '@/infra/utils';
import { SignUpController } from '@/presentation/controllers';
import { ValidatorComposite } from '@/validation/composite';
import {
  CompareFieldsValidator,
  RequiredValidator,
  EmailValidator,
  PasswordValidator,
} from '@/validation/validators';

export function buildSingUpController() {
  const userRepository = new UserRepository();
  const bcryptEncrypter = new BcryptEncrypter();
  const createUserService = new CreateUserService(
    userRepository,
    bcryptEncrypter
  );
  const bodyValidator = new ValidatorComposite([
    new RequiredValidator('email'),
    new RequiredValidator('name'),
    new RequiredValidator('password'),
    new CompareFieldsValidator('password', 'confirmPassword'),
    new EmailValidator('email'),
    new PasswordValidator('password'),
  ]);
  const signUpController = new SignUpController(
    createUserService,
    bodyValidator
  );
  return signUpController;
}
