import { User } from '@/domain/models';

export class UserViewModel {
  email: string;
  name: string;
  createdAt: string;

  static parse(user: User): UserViewModel {
    return {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
