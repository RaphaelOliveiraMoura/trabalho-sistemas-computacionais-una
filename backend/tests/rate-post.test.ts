import supertest from 'supertest';

import { signIn } from './utils/auth';

import { setupApplication } from '@/main/app';
import { PostBuilder } from '@/tests/builders';
import { PostRepository, UserRepository } from '@/tests/repositories';

let app = null;
let postRepository = null;
let userRepository = null;

describe('RatePost', () => {
  beforeAll(async () => {
    app = await setupApplication();

    postRepository = new PostRepository();
    userRepository = new UserRepository();
  });

  beforeEach(async () => {
    await postRepository.deleteAll();
    await userRepository.deleteAll();
    expect(await postRepository.count()).toBe(0);
    expect(await userRepository.count()).toBe(0);
  });

  test('should return 401 when try acesss route without authorization', async () => {
    const response = await supertest(app).post('/posts/1/rate').send();

    expect(response.status).toBe(401);
  });

  test('should rate a post', async () => {
    const { author, ...post } = new PostBuilder().build();

    const createdAuthor = await userRepository.create(author);
    const createdPost = await postRepository.create({
      ...post,
      authorId: createdAuthor.id,
    });

    const { authorization } = await signIn(app);
    const response = await supertest(app)
      .post(`/posts/${createdPost.id}/rate`)
      .set('authorization', authorization)
      .send({ rating: 4 });

    expect(response.status).toBe(200);
    expect(response.body.rating.total).toBe(4);
    expect(response.body.author).toHaveProperty('id');
    expect(response.body.author).not.toHaveProperty('password');
    expect(response.body.author).not.toHaveProperty('confirmPassword');
    expect(response.body.author).not.toHaveProperty('token');
  });

  test('should override post rate from same user', async () => {
    const { author, ...post } = new PostBuilder().build();

    const createdAuthor = await userRepository.create(author);
    const createdPost = await postRepository.create({
      ...post,
      authorId: createdAuthor.id,
    });

    const { authorization } = await signIn(app);

    await supertest(app)
      .post(`/posts/${createdPost.id}/rate`)
      .set('authorization', authorization)
      .send({ rating: 1 });

    const response = await supertest(app)
      .post(`/posts/${createdPost.id}/rate`)
      .set('authorization', authorization)
      .send({ rating: 5 });

    expect(response.status).toBe(200);
    expect(response.body.rating.total).toBe(5);
  });

  test('should calculate avg to post rating', async () => {
    const { author, ...post } = new PostBuilder().build();

    const createdAuthor = await userRepository.create(author);
    const createdPost = await postRepository.create({
      ...post,
      authorId: createdAuthor.id,
    });

    const { authorization: auth1 } = await signIn(app);
    const { authorization: auth2 } = await signIn(app);
    const { authorization: auth3 } = await signIn(app);

    await supertest(app)
      .post(`/posts/${createdPost.id}/rate`)
      .set('authorization', auth1)
      .send({ rating: 2 });

    await supertest(app)
      .post(`/posts/${createdPost.id}/rate`)
      .set('authorization', auth2)
      .send({ rating: 2 });

    const response = await supertest(app)
      .post(`/posts/${createdPost.id}/rate`)
      .set('authorization', auth3)
      .send({ rating: 5 });

    expect(response.status).toBe(200);
    expect(response.body.rating.total).toBe(3);
  });
});
