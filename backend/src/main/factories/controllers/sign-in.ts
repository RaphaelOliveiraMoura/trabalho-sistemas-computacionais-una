import { SignInService } from '@/data/services';
import { LocalMemoryUserRepository } from '@/infra/repositories';
import { BcryptEncrypter, JWTHasher } from '@/infra/utils';
import { SignInController } from '@/presentation/controllers';
import { ValidatorComposite } from '@/validation/composite';
import {
  EmailValidator,
  PasswordValidator,
  RequiredValidator,
} from '@/validation/validators';

export function buildSignInController() {
  const userRepository = new LocalMemoryUserRepository();
  const encrypter = new BcryptEncrypter();
  const hasher = new JWTHasher();

  const signInService = new SignInService(userRepository, encrypter, hasher);

  const bodyValidator = new ValidatorComposite([
    new RequiredValidator('email'),
    new RequiredValidator('password'),
    new EmailValidator('email'),
    new PasswordValidator('password'),
  ]);

  const controller = new SignInController(signInService, bodyValidator);
  return controller;
}
