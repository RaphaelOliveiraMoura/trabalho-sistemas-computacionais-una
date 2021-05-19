import { Validation } from '@/validation/contracts';

export class PasswordValidator implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(data: any): string {
    const validPassowrd =
      data[this.fieldName] && data[this.fieldName].length >= 8;
    if (!validPassowrd) {
      return 'password must have at least 8 characters';
    }
    return null;
  }
}
