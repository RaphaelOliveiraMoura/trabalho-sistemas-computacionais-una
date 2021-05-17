import jwt, { SignOptions } from 'jsonwebtoken';

import { Hasher } from '@/data/contracts';
import { env } from '@/utils';

export class JWTHasher implements Hasher {
  private config: SignOptions = {
    expiresIn: 24 * 60 * 60 * 60,
  };

  async encode(data: any): Promise<string> {
    const token = jwt.sign(data, env.hasher_secret, this.config);
    return token;
  }

  async decode(token: string): Promise<any> {
    const data = jwt.decode(token);
    return data;
  }
}
