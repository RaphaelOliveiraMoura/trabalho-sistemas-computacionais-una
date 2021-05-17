import { Validation } from '@/validation/contracts';

export class EmailValidator implements Validation {
  private emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private readonly fieldName: string) {}

  validate(data: any): string {
    const validEmail = this.emailRegex.test(data[this.fieldName]);
    if (!validEmail) {
      return `${this.fieldName} is invalid`;
    }
    return null;
  }
}
