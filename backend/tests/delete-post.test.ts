import supertest from 'supertest';

import { signIn } from './utils/auth';

import { setupApplication } from '@/main/app';
import { PostBuilder } from '@/tests/builders';
import { PostRepository, UserRepository } from '@/tests/repositories';

let app = null;
let postRepository: PostRepository = null;
let userRepository: UserRepository = null;

describe('DeletePost', () => {
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
    const response = await supertest(app).delete('/posts/1').send();

    expect(response.status).toBe(401);
  });

  test('should return 400 when try delete a invalid post', async () => {
    const { authorization } = await signIn(app);

    const response = await supertest(app)
      .delete(`/posts/${'invalid-post-id'}`)
      .set('authorization', authorization)
      .send();

    expect(response.body).toStrictEqual({
      error: 'invalid post',
    });
    expect(response.status).toBe(400);
  });

  test('should return 401 when try delete a post created by other user', async () => {
    const { author, ...post } = new PostBuilder().build();
    const createdAuthor = await userRepository.create(author);

    const createdPost = await postRepository.create({
      ...post,
      authorId: createdAuthor.id,
    });

    expect(await postRepository.findById(createdPost.id)).toBeTruthy();

    const { authorization } = await signIn(app);

    const response = await supertest(app)
      .delete(`/posts/${createdPost.id}`)
      .set('authorization', authorization)
      .send();

    expect(response.body).toStrictEqual({
      error: 'you cannot authorization to this action',
    });
    expect(response.status).toBe(401);

    expect(await postRepository.findById(createdPost.id)).toBeTruthy();
  });

  test('should delete a post and comments & ratings', async () => {
    const { authorization, user } = await signIn(app);

    const post = new PostBuilder().build();
    delete post.author;

    const createdPost = await postRepository.create({
      ...post,
      authorId: user.id,
    });

    expect(await postRepository.findById(createdPost.id)).toBeTruthy();

    await postRepository.createComment({
      authorId: user.id,
      postId: createdPost.id,
      text: 'comment',
    });

    await postRepository.createRating({
      userId: user.id,
      postId: createdPost.id,
      rating: 2,
    });

    expect(await postRepository.findById(createdPost.id)).toBeTruthy();

    expect(await postRepository.countComments()).toBe(1);
    expect(await postRepository.countRatings()).toBe(1);

    const response = await supertest(app)
      .delete(`/posts/${createdPost.id}`)
      .set('authorization', authorization)
      .send();

    expect(response.body).toBeNull();
    expect(response.status).toBe(200);

    expect(await postRepository.findById(createdPost.id)).not.toBeTruthy();

    expect(await postRepository.countComments()).toBe(0);
    expect(await postRepository.countRatings()).toBe(0);
  });
});
