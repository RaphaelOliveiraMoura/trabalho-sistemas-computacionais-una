import express from 'express';

import { setupDatabase } from './config/database';

import { setupRoutes, setupMiddlewares } from '@/main/config';

export async function setupApplication() {
  const app = express();

  await setupDatabase();
  setupMiddlewares(app);
  setupRoutes(app);

  return app;
}
