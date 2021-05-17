import { Validation } from '@/validation/contracts';

export class ValidatorComposite implements Validation {
  constructor(private readonly validators: Validation[] = []) {}

  validate(data: any): string {
    const mapValidations = this.validators.map((v) => v.validate(data));
    const errors = mapValidations.filter((error) => !!error);
    return errors.shift();
  }
}
