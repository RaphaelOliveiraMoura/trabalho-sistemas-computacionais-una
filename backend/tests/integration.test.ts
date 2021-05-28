import supertest from 'supertest';

import { setupApplication } from '@/main/app';
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
    await userRepository.deleteAll();
  });

  test('should test a complete integration flow', async () => {
    await supertest(app)
      .post('/signin')
      .send({
        email: 'user1@gmail.com',
        password: 'user123456',
      })
      .expect(401);

    await supertest(app)
      .post('/signup')
      .send({
        email: 'user1@gmail.com',
        name: 'username',
        password: 'user123456',
        confirmPassword: 'user123456',
      })
      .expect(200);

    await supertest(app)
      .post('/signup')
      .send({
        email: 'user2@gmail.com',
        name: 'username 2',
        password: 'user123456',
        confirmPassword: 'user123456',
      })
      .expect(200);

    await supertest(app)
      .post('/signup')
      .send({
        email: 'user3@gmail.com',
        name: 'username 3',
        password: 'user123456',
        confirmPassword: 'user123456',
      })
      .expect(200);

    const {
      body: { token: tokenUser1 },
    } = await supertest(app)
      .post('/signin')
      .send({
        email: 'user1@gmail.com',
        password: 'user123456',
      })
      .expect(200);

    const {
      body: { token: tokenUser2 },
    } = await supertest(app)
      .post('/signin')
      .send({
        email: 'user2@gmail.com',
        password: 'user123456',
      })
      .expect(200);

    const {
      body: { token: tokenUser3 },
    } = await supertest(app)
      .post('/signin')
      .send({
        email: 'user3@gmail.com',
        password: 'user123456',
      })
      .expect(200);

    await supertest(app).get('/posts').send().expect(200);

    await supertest(app)
      .get('/posts')
      .send()
      .set('authorization', `Bearer ${tokenUser1}`)
      .expect(200);

    await supertest(app)
      .get('/posts/1')
      .send()
      .set('authorization', `Bearer ${tokenUser1}`)
      .expect(400);

    await supertest(app)
      .post('/posts')
      .send({
        title: 'Primeira postagem',
        description: 'Esta é minha primeira postagem no blog',
        image:
          'https://image.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg',
        body:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eros sapien, fringilla quis velit semper, tempus scelerisque risus. Nulla dictum laoreet metus vel aliquet. Pellentesque efficitur ex at aliquam consequat. Donec id scelerisque tellus. Aliquam sem libero, laoreet id faucibus at, vestibulum sit amet velit. Nunc in rutrum ante. Cras mattis pellentesque tortor. Mauris nec ligula eu tortor ultrices egestas. Donec rutrum, justo nec hendrerit porta, nisi libero condimentum erat, sit amet fermentum ex libero at nibh. Vivamus eget posuere ipsum.\n\nPhasellus ullamcorper pulvinar odio ut eleifend. Sed ut scelerisque enim, quis luctus tortor. Morbi a elit vel elit pharetra varius pellentesque et ex. Sed tempus commodo elit, quis tincidunt ex viverra vitae. Donec in lorem nec tortor pharetra consectetur eu eu metus. Fusce facilisis est vel odio fermentum scelerisque. Sed accumsan tortor quis magna vehicula, a consequat dolor condimentum. Sed eleifend facilisis tristique. Aenean varius molestie risus quis viverra.',
      })
      .set('authorization', `Bearer ${tokenUser1}`)
      .expect(201);

    const { body: createdPost } = await supertest(app)
      .get('/posts/1')
      .send()
      .set('authorization', `Bearer ${tokenUser1}`)
      .expect(200);

    expect(createdPost.comments.length).toBe(0);
    expect(createdPost.rating.total).toBe(0);
    expect(createdPost.rating.current).toBe(null);

    await supertest(app)
      .post('/posts/1/comment')
      .send({ text: 'Comentário maneiro do usuario 1' })
      .set('authorization', `Bearer ${tokenUser1}`)
      .expect(200);

    await supertest(app)
      .post('/posts/1/comment')
      .send({ text: 'Comentário maneiro 2 do usuario 1' })
      .set('authorization', `Bearer ${tokenUser1}`)
      .expect(200);

    await supertest(app)
      .post('/posts/1/comment')
      .send({ text: 'Comentário maneiro do usuario 2' })
      .set('authorization', `Bearer ${tokenUser2}`)
      .expect(200);

    await supertest(app)
      .post('/posts/1/comment')
      .send({ text: 'Comentário maneiro do usuario 3' })
      .set('authorization', `Bearer ${tokenUser3}`)
      .expect(200);

    await supertest(app)
      .post('/posts/1/rate')
      .send({ rating: 1 })
      .set('authorization', `Bearer ${tokenUser1}`)
      .expect(200);

    await supertest(app)
      .post('/posts/1/rate')
      .send({ rating: 5 })
      .set('authorization', `Bearer ${tokenUser1}`)
      .expect(200);

    await supertest(app)
      .post('/posts/1/rate')
      .send({ rating: 3 })
      .set('authorization', `Bearer ${tokenUser2}`)
      .expect(200);

    await supertest(app)
      .post('/posts/1/rate')
      .send({ rating: 1 })
      .set('authorization', `Bearer ${tokenUser3}`)
      .expect(200);

    const { body: updatedPost } = await supertest(app)
      .get('/posts/1')
      .send()
      .set('authorization', `Bearer ${tokenUser1}`)
      .expect(200);

    expect(updatedPost.comments.length).toBe(4);
    expect(updatedPost.rating.total).toBe(3);
    expect(updatedPost.rating.current).toBe(5);
  });
});
