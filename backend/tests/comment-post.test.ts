import supertest from 'supertest';

import { signIn } from './utils/auth';

import app from '@/main/app';
import { PostBuilder } from '@/tests/builders';
import { PostRepository, UserRepository } from '@/tests/repositories';

const postRepository = new PostRepository();
const userRepository = new UserRepository();

describe('CommentPost', () => {
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
    expect(response.body.author.id).toBe(user.id);
  });

  test('should return 400 when try comment at invalid post', async () => {
    const { authorization } = await signIn(app);
    const response = await supertest(app)
      .post(`/posts/invalid-post/comment`)
      .set('authorization', authorization)
      .send({ text: 'My random comment' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('InvalidPostError');
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
