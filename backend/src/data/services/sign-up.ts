import { Encrypter, UserRepository } from '@/data/contracts';
import { UserAlreadyExistsError } from '@/domain/errors';
import { SignUp } from '@/domain/use-cases';

export class CreateUserService implements SignUp {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter
  ) {}

  async signUp(userParams: SignUp.Params): Promise<SignUp.Result> {
    const userAlreadyExists = await this.userRepository.findByEmail(
      userParams.email
    );

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError();
    }

    const encryptedPassword = await this.encrypter.encrypt(userParams.password);

    const user = {
      ...userParams,
      password: encryptedPassword,
    };

    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }
}
