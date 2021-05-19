import supertest from 'supertest';

import { BcryptEncrypter } from '@/infra/utils';
import { setupApplication } from '@/main/app';
import { UserBuilder } from '@/tests/builders';
import { UserRepository } from '@/tests/repositories';

const encrypter = new BcryptEncrypter();

let app = null;
let userRepository = null;

describe('SignIn', () => {
  beforeAll(async () => {
    app = await setupApplication();

    userRepository = new UserRepository();
  });

  beforeEach(async () => {
    await userRepository.deleteAll();

    expect(await userRepository.count()).toBe(0);
  });

  test('should sign in when pass correct credentials', async () => {
    const user = new UserBuilder().build();
    const encryptedPassword = await encrypter.encrypt(user.password);

    await userRepository.create({
      ...user,
      password: encryptedPassword,
    });

    const response = await supertest(app)
      .post('/signin')
      .send({ email: user.email, password: user.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should return 401 when try signin with non created user', async () => {
    const response = await supertest(app)
      .post('/signin')
      .send({ email: 'emailteste@gmail.com', password: 'senha12345678' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'invalid credentials' });
  });

  test('should return 400 when not pass email', async () => {
    const user = new UserBuilder().build();
    const encryptedPassword = await encrypter.encrypt(user.password);

    await userRepository.create({
      ...user,
      password: encryptedPassword,
    });

    const response = await supertest(app)
      .post('/signin')
      .send({ password: user.password });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'email is required' });
  });

  test('should return 400 when not pass password', async () => {
    const user = new UserBuilder().build();
    const encryptedPassword = await encrypter.encrypt(user.password);

    await userRepository.create({
      ...user,
      password: encryptedPassword,
    });

    const response = await supertest(app)
      .post('/signin')
      .send({ email: user.email });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'password is required' });
  });

  test('should return 400 when pass invalid email', async () => {
    const user = new UserBuilder().build();
    const encryptedPassword = await encrypter.encrypt(user.password);

    await userRepository.create({
      ...user,
      password: encryptedPassword,
    });

    const response = await supertest(app)
      .post('/signin')
      .send({ email: 'invalid_email', password: user.password });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'email is invalid' });
  });

  test('should return 400 when pass invalid password', async () => {
    const user = new UserBuilder().build();
    const encryptedPassword = await encrypter.encrypt(user.password);

    await userRepository.create({
      ...user,
      password: encryptedPassword,
    });

    const response = await supertest(app)
      .post('/signin')
      .send({ email: user.email, password: 'invalid_password' });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error:
        'password need have minimum eight characters and at least one letter and one number',
    });
  });
});
