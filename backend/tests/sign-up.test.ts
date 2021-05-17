import supertest from 'supertest';

import app from '@/main/app';
import { UserBuilder } from '@/tests/builders';
import { UserRepository } from '@/tests/repositories';
import { omit } from '@/utils';

const userRepository = new UserRepository();

describe('SignUp', () => {
  beforeEach(async () => {
    await userRepository.deleteAll();
  });

  test('create a user with success', async () => {
    const initialUsersCount = await userRepository.count();
    expect(initialUsersCount).toBe(0);

    const user = new UserBuilder().build();

    const response = await supertest(app).post('/signup').send(user);

    expect(response.status).toBe(200);

    expect(response.body).not.toHaveProperty('password');
    expect(response.body).not.toHaveProperty('confirmPassword');

    const omitPros = ['password', 'confirmPassword'];
    expect(omit(response.body, omitPros)).toMatchObject(omit(user, omitPros));

    const createdUser = await userRepository.findByEmail(user.email);
    expect(createdUser.password).not.toBe(user.password);
  });

  test('badRequest when try create a user that already exists', async () => {
    const user = new UserBuilder().build();

    await userRepository.create(user);

    const initialUsersCount = await userRepository.count();
    expect(initialUsersCount).toBe(1);

    const response = await supertest(app).post('/signup').send(user);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'user already exists' });

    const usersCount = await userRepository.count();
    expect(usersCount).toBe(1);
  });

  const fakeUser = new UserBuilder().build();

  [
    [{ ...fakeUser, email: undefined }, 'email'],
    [{ ...fakeUser, name: undefined }, 'name'],
    [{ ...fakeUser, password: undefined }, 'password'],
    [{}, 'email'],
  ].forEach(async ([invalidPayload, expection]) => {
    test(`badRequest when try create a user with missing '${expection}' at body`, async () => {
      const response = await supertest(app)
        .post('/signup')
        .send(invalidPayload);

      expect(response.status).toBe(400);
      const errorMessage = `${expection} is required`;
      expect(response.body).toEqual({ error: errorMessage });
    });
  });

  test('badRequest when try create a user with password and confirmPassword mismatching', async () => {
    const user = new UserBuilder().build();

    const invalidUser = {
      ...user,
      confirmPassword: 'invalid_confirm_password',
    };

    const response = await supertest(app).post('/signup').send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'password and confirmPassword unmatch',
    });

    const usersCount = await userRepository.count();
    expect(usersCount).toBe(0);
  });

  test('badRequest when try create a user with invalid email', async () => {
    const user = new UserBuilder().build();

    const invalidUser = {
      ...user,
      email: 'invalid_email',
    };

    const response = await supertest(app).post('/signup').send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'email is invalid',
    });

    const usersCount = await userRepository.count();
    expect(usersCount).toBe(0);
  });

  test('badRequest when try create a user with invalid password', async () => {
    const user = new UserBuilder().build();

    const invalidUser = {
      ...user,
      password: 'invalid_password',
      confirmPassword: 'invalid_password',
    };

    const response = await supertest(app).post('/signup').send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error:
        'password need have minimum eight characters and at least one letter and one number',
    });

    const usersCount = await userRepository.count();
    expect(usersCount).toBe(0);
  });
});
