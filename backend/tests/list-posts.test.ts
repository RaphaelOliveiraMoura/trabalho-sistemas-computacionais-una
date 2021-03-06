import supertest from 'supertest';

import { signIn } from './utils/auth';

import { setupApplication } from '@/main/app';
import { PostBuilder } from '@/tests/builders';
import { PostRepository, UserRepository } from '@/tests/repositories';

let app = null;
let postRepository = null;
let userRepository = null;

describe('ListPosts', () => {
  beforeAll(async () => {
    app = await setupApplication();

    postRepository = new PostRepository();
    userRepository = new UserRepository();
  });

  beforeEach(async () => {
    await postRepository.deleteAll();
  });

  test('should return 200 when try acesss route without authorization header', async () => {
    const response = await supertest(app).get('/posts').send();

    expect(response.status).toBe(200);
  });

  test('should list posts', async () => {
    const inititalPostsCount = await postRepository.count();
    expect(inititalPostsCount).toBe(0);

    const postsToInsert = 10;

    const posts = Array(postsToInsert)
      .fill(0)
      .map(() => new PostBuilder().build());

    await Promise.all(
      posts.map(async ({ author, ...post }) => {
        const createdAuthor = await userRepository.create(author);
        await postRepository.create({ ...post, authorId: createdAuthor.id });
      })
    );

    const { authorization } = await signIn(app);
    const response = await supertest(app)
      .get('/posts')
      .set('authorization', authorization)
      .send();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(postsToInsert);
    expect(Array.isArray(response.body[0].comments)).toBeFalsy();
    expect(response.body[0].author).toHaveProperty('id');
    expect(response.body[0].author).not.toHaveProperty('password');
    expect(response.body[0].author).not.toHaveProperty('confirmPassword');
    expect(response.body[0].author).not.toHaveProperty('token');
  });

  test('should return empty array of posts', async () => {
    const { authorization } = await signIn(app);
    const response = await supertest(app)
      .get('/posts')
      .set('authorization', authorization)
      .send();

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body.length).toBe(0);
  });
});
