import { Validation } from '@/validation/contracts';

export class RequiredValidator implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(data: any): string {
    if (!data[this.fieldName]) return `${this.fieldName} is required`;
    return null;
  }
}
