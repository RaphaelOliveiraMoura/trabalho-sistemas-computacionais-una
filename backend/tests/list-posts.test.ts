import supertest from 'supertest';

import { signIn } from './utils/auth';

import app from '@/main/app';
import { PostBuilder } from '@/tests/builders';
import { PostRepository, UserRepository } from '@/tests/repositories';

const postRepository = new PostRepository();
const userRepository = new UserRepository();

describe('ListPosts', () => {
  beforeEach(async () => {
    await postRepository.deleteAll();
  });

  test('should return 401 when try acesss route without authorization', async () => {
    const response = await supertest(app).get('/posts').send();

    expect(response.status).toBe(401);
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
