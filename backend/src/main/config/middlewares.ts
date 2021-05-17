import { Application } from 'express';

import { cors, json } from '@/main/middlewares/';

export function setupMiddlewares(app: Application) {
  app.use(json());
  app.use(cors());
}
