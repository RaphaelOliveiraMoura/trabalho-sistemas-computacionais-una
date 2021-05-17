import { User } from '@/domain/models';
import { SignUp } from '@/domain/use-cases';

export interface UserRepository {
  count: () => Promise<number>;

  create: (user: SignUp.Params) => Promise<User>;

  findById: (userId: string) => Promise<User | null>;

  findByEmail: (email: string) => Promise<User | null>;

  deleteAll: () => Promise<boolean>;
}
