import { CustomError } from '@/utils';

export class UserAlreadyExistsError extends CustomError {
  constructor() {
    super(UserAlreadyExistsError, 'user already exists');
  }
}
