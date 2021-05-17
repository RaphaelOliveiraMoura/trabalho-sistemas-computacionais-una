import { CustomError } from '@/utils';

export class BodyValidationError extends CustomError {
  constructor(error: string) {
    super(BodyValidationError, error);
  }
}
