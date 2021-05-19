import { AuthorizationService } from '@/data/services/authorization';
import { UserRepository } from '@/infra/repositories';
import { JWTHasher } from '@/infra/utils';

export function buildAuthorizationService() {
  const hasher = new JWTHasher();
  const userRepository = new UserRepository();
  const authorizationService = new AuthorizationService(userRepository, hasher);
  return authorizationService;
}
