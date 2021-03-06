import { User } from '@/domain/models';

export class UserViewModel {
  email: string;
  name: string;
  createdAt?: string;

  static parse(user: Partial<User>): UserViewModel {
    return {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt ? user.createdAt.toISOString() : null,
    };
  }
}
