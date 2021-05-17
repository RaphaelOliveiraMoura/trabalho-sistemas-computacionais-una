import { CustomError } from '@/utils';

export class InvalidAuthorizationError extends CustomError {
  constructor(name: string) {
    super(InvalidAuthorizationError, name);
  }
}
