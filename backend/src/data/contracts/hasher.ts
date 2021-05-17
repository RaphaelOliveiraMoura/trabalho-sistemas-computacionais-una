export interface Hasher {
  encode: (data: any) => Promise<string>;
  decode: (token: string) => Promise<any>;
}
