import { Router } from 'express';

import { ExpressRouteAdapter } from '@/main/adapters';
import { buildSingUpController, buildSignInController } from '@/main/factories';

export default function setup(router: Router) {
  router.post('/signup', ExpressRouteAdapter.adapt(buildSingUpController()));
  router.post('/signin', ExpressRouteAdapter.adapt(buildSignInController()));
}
