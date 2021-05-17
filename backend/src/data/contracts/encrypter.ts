export interface Encrypter {
  encrypt: (text: string) => Promise<string>;
  compare: (plainText: string, encryptedText: string) => Promise<boolean>;
}
