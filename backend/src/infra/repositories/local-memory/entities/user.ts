import { User } from '@/domain/models';

export class LocalMemoryUserEntity {
  id: string;
  email: string;
  name: string;
  password: string;
  created_at: Date;

  static parse({ createdAt, ...restEntity }: User): LocalMemoryUserEntity {
    return {
      ...restEntity,
      created_at: createdAt,
    };
  }

  static unparse({ created_at, ...restEntity }: LocalMemoryUserEntity): User {
    return {
      ...restEntity,
      createdAt: created_at,
    };
  }
}
