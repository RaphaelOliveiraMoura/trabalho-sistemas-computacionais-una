import { Validation } from '@/validation/contracts';

export class PasswordValidator implements Validation {
  private passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  constructor(private readonly fieldName: string) {}

  validate(data: any): string {
    const validPassowrd = this.passwordRegex.test(data[this.fieldName]);
    if (!validPassowrd) {
      return 'password need have minimum eight characters and at least one letter and one number';
    }
    return null;
  }
}
