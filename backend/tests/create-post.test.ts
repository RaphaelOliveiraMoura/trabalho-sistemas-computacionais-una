import supertest from 'supertest';

import { signIn } from './utils/auth';

import app from '@/main/app';
import { PostBuilder } from '@/tests/builders';
import { PostRepository, UserRepository } from '@/tests/repositories';

const postRepository = new PostRepository();
const userRepository = new UserRepository();

describe('CreatePost', () => {
  beforeEach(async () => {
    await postRepository.deleteAll();
    await userRepository.deleteAll();
    expect(await postRepository.count()).toBe(0);
    expect(await userRepository.count()).toBe(0);
  });

  test('should return 401 when try acesss route without authorization', async () => {
    const response = await supertest(app).post('/posts').send();

    expect(response.status).toBe(401);
  });

  test('should create a post', async () => {
    const post = new PostBuilder().build({ excludeProps: ['author'] });

    const { authorization, user } = await signIn(app);
    const response = await supertest(app)
      .post('/posts')
      .set('authorization', authorization)
      .send(post);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toMatchObject(post);
    expect(response.body.author.email).toBe(user.email);
    expect(response.body.author).not.toHaveProperty('id');
    expect(response.body.author).not.toHaveProperty('password');
    expect(response.body.author).not.toHaveProperty('confirmPassword');
    expect(response.body.author).not.toHaveProperty('token');

    const insertedPost = await postRepository.findById(response.body.id);

    expect(insertedPost.title).toEqual(response.body.title);
    expect(insertedPost.description).toEqual(response.body.description);
    expect(insertedPost.image).toEqual(response.body.image);
    expect(insertedPost.body).toEqual(response.body.body);
  });

  test('should return 400 when try create invalid posts', async () => {
    const buildPost = () =>
      new PostBuilder().build({ excludeProps: ['author'] });

    const testCases = [
      [{ ...buildPost(), title: undefined }, 'title is required'],
      [{ ...buildPost(), description: undefined }, 'description is required'],
      [{ ...buildPost(), body: undefined }, 'body is required'],
      [{ ...buildPost(), image: undefined }, 'image is required'],
    ];

    const { authorization } = await signIn(app);

    await Promise.all(
      testCases.map(async ([post, errorMessage]) => {
        const response = await supertest(app)
          .post('/posts')
          .set('authorization', authorization)
          .send(post);

        expect(response.status).toBe(400);
        expect(response.body.error).toBe(errorMessage);
      })
    );
  });
});
