import express from 'express';

import { setupRoutes, setupMiddlewares } from '@/main/config';

const app = express();

setupMiddlewares(app);
setupRoutes(app);

export default app;
