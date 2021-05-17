import { Application, Router } from 'express';

import auth from '@/main/routes/auth';
import post from '@/main/routes/post';

export function setupRoutes(app: Application) {
  const router = Router();

  auth(router);
  post(router);

  app.use(router);
}
