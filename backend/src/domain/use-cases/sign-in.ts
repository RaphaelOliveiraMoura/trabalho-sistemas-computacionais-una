export interface SignIn {
  signIn: (params: SignIn.Params) => Promise<SignIn.Result>;
}

export namespace SignIn {
  export type Params = {
    email: string;
    password: string;
  };

  export type Result = {
    token: string;
    email: string;
    name: string;
  };
}
