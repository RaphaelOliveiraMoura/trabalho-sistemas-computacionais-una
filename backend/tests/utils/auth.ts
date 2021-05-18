import supertest from 'supertest';

import { User } from '@/domain/models';
import { BcryptEncrypter } from '@/infra/utils';
import { UserBuilder } from '@/tests/builders';
import { UserRepository } from '@/tests/repositories';

type signInResult = {
  authorization: string;
  user: User;
};

export async function signIn(app: any): Promise<signInResult> {
  const userRepository = new UserRepository();
  const encrypter = new BcryptEncrypter();

  const user = new UserBuilder().build();

  const encryptedPassword = await encrypter.encrypt(user.password);

  const createdUser = await userRepository.create({
    ...user,
    password: encryptedPassword,
  });

  const response = await supertest(app)
    .post('/signin')
    .send({ email: user.email, password: user.password });

  return { authorization: `Bearer ${response.body.token}`, user: createdUser };
}
