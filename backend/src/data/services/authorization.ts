import { Hasher, UserRepository } from '@/data/contracts';
import { InvalidAuthorizationError } from '@/domain/errors';
import { User } from '@/domain/models';

export class AuthorizationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async authorize(authorization: string): Promise<User> {
    if (typeof authorization !== 'string')
      throw new InvalidAuthorizationError(
        'you need provide authorization token'
      );

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer')
      throw new InvalidAuthorizationError(
        'authorization must have `Bearer Token` format'
      );

    if (!token)
      throw new InvalidAuthorizationError(
        'authorization must have `Bearer Token` format'
      );

    const decodedToken = await this.hasher.decode(token);

    if (!decodedToken || !decodedToken.id)
      throw new InvalidAuthorizationError('authorization Token is invalid');

    const user = await this.userRepository.findById(decodedToken.id);

    if (!user)
      throw new InvalidAuthorizationError('authorization Token is invalid');

    return user;
  }
}
