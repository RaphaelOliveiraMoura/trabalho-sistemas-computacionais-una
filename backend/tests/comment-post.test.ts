import supertest from 'supertest';

import { signIn } from './utils/auth';

import { setupApplication } from '@/main/app';
import { PostBuilder } from '@/tests/builders';
import { PostRepository, UserRepository } from '@/tests/repositories';

let app = null;
let postRepository = null;
let userRepository = null;

describe('CommentPost', () => {
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
    const response = await supertest(app).post('/posts/1/comment').send();

    expect(response.status).toBe(401);
  });

  test('should comment in a post', async () => {
    const { author, ...post } = new PostBuilder().build();

    const createdAuthor = await userRepository.create(author);
    const createdPost = await postRepository.create({
      ...post,
      authorId: createdAuthor.id,
    });

    const { authorization, user } = await signIn(app);
    const response = await supertest(app)
      .post(`/posts/${createdPost.id}/comment`)
      .set('authorization', authorization)
      .send({ text: 'My random comment' });

    expect(response.status).toBe(200);
    expect(response.body.text).toBe('My random comment');
    expect(response.body.author.email).toBe(user.email);
    expect(response.body.author).toHaveProperty('id');
    expect(response.body.author).not.toHaveProperty('password');
    expect(response.body.author).not.toHaveProperty('confirmPassword');
    expect(response.body.author).not.toHaveProperty('token');
  });

  test('should return 400 when try comment at invalid post', async () => {
    const { authorization } = await signIn(app);
    const response = await supertest(app)
      .post(`/posts/invalid-post/comment`)
      .set('authorization', authorization)
      .send({ text: 'My random comment' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('invalid post');
  });

  test('should return 400 when try comment with invalid payload', async () => {
    const { author, ...post } = new PostBuilder().build();

    const createdAuthor = await userRepository.create(author);
    const createdPost = await postRepository.create({
      ...post,
      authorId: createdAuthor.id,
    });

    const { authorization } = await signIn(app);
    const response = await supertest(app)
      .post(`/posts/${createdPost.id}/comment`)
      .set('authorization', authorization)
      .send({ invalid: 'Payload' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('text is required');
  });
});
