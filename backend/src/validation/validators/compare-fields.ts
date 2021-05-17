import { Validation } from '@/validation/contracts';

export class CompareFieldsValidator implements Validation {
  constructor(
    private readonly field1: string,
    private readonly field2: string
  ) {}

  validate(data: any): string {
    if (data[this.field1] !== data[this.field2]) {
      return `${this.field1} and ${this.field2} unmatch`;
    }
    return null;
  }
}
