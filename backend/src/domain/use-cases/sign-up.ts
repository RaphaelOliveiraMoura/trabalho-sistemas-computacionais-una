import { User } from '@/domain/models';

export interface SignUp {
  signUp: (userParams: SignUp.Params) => Promise<SignUp.Result>;
}

export namespace SignUp {
  export type Params = {
    email: string;
    name: string;
    password: string;
  };

  export type Result = User;
}
