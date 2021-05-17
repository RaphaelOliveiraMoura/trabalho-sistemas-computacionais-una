import { Router } from 'express';

import { ExpressRouteAdapter } from '@/main/adapters';
import {
  buildCommentPostController,
  buildCreatePostController,
  buildListPostsController,
  buildRatePostController,
} from '@/main/factories';

export default function setup(router: Router) {
  router.get('/posts', ExpressRouteAdapter.adapt(buildListPostsController()));

  router.post('/posts', ExpressRouteAdapter.adapt(buildCreatePostController()));

  router.post(
    '/posts/:id/comment',
    ExpressRouteAdapter.adapt(buildCommentPostController())
  );

  router.post(
    '/posts/:id/rate',
    ExpressRouteAdapter.adapt(buildRatePostController())
  );
}
