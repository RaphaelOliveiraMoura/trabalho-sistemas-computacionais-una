import { CustomError } from '@/utils';

export class InvalidPostError extends CustomError {
  constructor() {
    super(InvalidPostError, 'InvalidPostError');
  }
}
