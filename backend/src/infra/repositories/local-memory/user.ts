import { LocalMemoryUserEntity } from './entities';

import { UserRepository } from '@/data/contracts';
import { User } from '@/domain/models';
import { SignUp } from '@/domain/use-cases';

export const users: Array<LocalMemoryUserEntity> = [];

export class LocalMemoryUserRepository implements UserRepository {
  async count(): Promise<number> {
    return users.length;
  }

  async create({ email, name, password }: SignUp.Params): Promise<User> {
    const parsedUser = LocalMemoryUserEntity.parse({
      id: String(users.length),
      email,
      name,
      password,
      createdAt: new Date(),
    });

    users.push(parsedUser);

    return LocalMemoryUserEntity.unparse(parsedUser);
  }

  async findById(userId: string): Promise<User> {
    const findedUser = users.find((user) => user.id === userId);

    if (!findedUser) return null;

    return LocalMemoryUserEntity.unparse(findedUser);
  }

  async findByEmail(email: string): Promise<User> {
    const findedUser = users.find((user) => user.email === email);

    if (!findedUser) return null;

    return LocalMemoryUserEntity.unparse(findedUser);
  }

  async deleteAll(): Promise<boolean> {
    users.splice(0, users.length);
    return true;
  }
}
