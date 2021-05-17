import brcypt from 'bcrypt';

import { Encrypter } from '@/data/contracts';

export class BcryptEncrypter implements Encrypter {
  private saltRounds = 10;

  async encrypt(text: string): Promise<string> {
    return brcypt.hash(text, this.saltRounds);
  }

  async compare(plainText: string, encryptedText: string): Promise<boolean> {
    return brcypt.compare(plainText, encryptedText);
  }
}
