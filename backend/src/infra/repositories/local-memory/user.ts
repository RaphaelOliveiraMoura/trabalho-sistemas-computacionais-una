import { UserRepository } from '@/data/contracts';
import { User } from '@/domain/models';
import { SignUp } from '@/domain/use-cases';

export const users: Array<User> = [];

export class LocalMemoryUserRepository implements UserRepository {
  async count(): Promise<number> {
    return users.length;
  }

  async create({ email, name, password }: SignUp.Params): Promise<User> {
    const user = {
      id: String(users.length),
      email,
      name,
      password,
      createdAt: new Date(),
    };

    users.push(user);

    return user;
  }

  async findById(userId: string): Promise<User> {
    const findedUser = users.find((user) => user.id === userId);

    if (!findedUser) return null;

    return findedUser;
  }

  async findByEmail(email: string): Promise<User> {
    const findedUser = users.find((user) => user.email === email);

    if (!findedUser) return null;

    return findedUser;
  }

  async deleteAll(): Promise<boolean> {
    users.splice(0, users.length);
    return true;
  }
}
