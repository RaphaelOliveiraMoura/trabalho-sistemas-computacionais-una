import { Encrypter, Hasher, UserRepository } from '@/data/contracts';
import { InvalidCredentialsError } from '@/domain/errors';
import { SignIn } from '@/domain/use-cases';

export class SignInService implements SignIn {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
    private readonly hasher: Hasher
  ) {}

  async signIn({ email, password }: SignIn.Params): Promise<SignIn.Result> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsError();

    const correctPassword = await this.encrypter.compare(
      password,
      user.password
    );

    if (!correctPassword) throw new InvalidCredentialsError();

    const token = await this.hasher.encode({ id: user.id });

    return { token };
  }
}
