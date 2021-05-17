import faker from 'faker';

import { User, UserBuilder } from './user';

type Post = {
  title: string;
  description: string;
  body: string;
  image: string;
  author: User;
};

type BuildOptions = {
  excludeProps: string[];
};

export class PostBuilder {
  post: Post;

  constructor({
    title = faker.commerce.productName(),
    description = faker.commerce.productDescription(),
    body = faker.lorem.paragraphs(3),
    image = faker.internet.url(),
    author = new UserBuilder().build(),
  }: Partial<Post> = {}) {
    this.post = {
      title,
      description,
      body,
      image,
      author,
    };
  }

  build({ excludeProps }: BuildOptions = { excludeProps: [] }) {
    excludeProps.forEach((prop) => delete this.post[prop]);
    return this.post;
  }
}
