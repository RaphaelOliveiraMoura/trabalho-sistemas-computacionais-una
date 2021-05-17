import faker from 'faker';

export type User = {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
};

type BuildOptions = {
  excludeProps: string[];
};

export class UserBuilder {
  user: User;

  constructor({
    name = faker.name.firstName(),
    email = faker.internet.email(),
    password = `5${faker.internet.password(8, false, /[a-z]/)}`,
  }: Partial<User> = {}) {
    this.user = {
      name,
      email,
      password,
      confirmPassword: password,
    };
  }

  build({ excludeProps }: BuildOptions = { excludeProps: [] }) {
    excludeProps.forEach((prop) => delete this.user[prop]);
    return this.user;
  }
}
