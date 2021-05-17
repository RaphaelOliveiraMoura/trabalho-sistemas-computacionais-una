import { Validation } from '@/validation/contracts';

type DateValidatorOptions = {
  parse?: boolean;
  past?: boolean;
};

export class DateValidator implements Validation {
  constructor(
    private readonly fieldName,
    private readonly options: DateValidatorOptions = {
      parse: false,
      past: false,
    }
  ) {}

  private parseDate(date: string): Date | null {
    const parsedDate = new Date(date);
    if (parsedDate.toString() === 'Invalid Date') return null;
    return parsedDate;
  }

  validate(data: any): string {
    const date: Date = this.options.parse
      ? this.parseDate(data[this.fieldName])
      : data[this.fieldName];

    const isDate = date instanceof Date;

    if (!isDate) return `${this.fieldName} must be date`;

    const isPast = date.getTime() < new Date().getTime();

    if (this.options.past && !isPast)
      return `${this.fieldName} must be a past date`;

    return null;
  }
}
