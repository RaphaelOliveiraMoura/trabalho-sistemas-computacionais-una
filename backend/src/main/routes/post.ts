import { Router } from 'express';

import { ExpressRouteAdapter } from '@/main/adapters';
import {
  buildCommentPostController,
  buildCreatePostController,
  buildDeletePostController,
  buildGetPostController,
  buildListPostsController,
  buildRatePostController,
} from '@/main/factories';

export default function setup(router: Router) {
  router.get('/posts', ExpressRouteAdapter.adapt(buildListPostsController()));

  router.get('/posts/:id', ExpressRouteAdapter.adapt(buildGetPostController()));

  router.post('/posts', ExpressRouteAdapter.adapt(buildCreatePostController()));

  router.post(
    '/posts/:id/comment',
    ExpressRouteAdapter.adapt(buildCommentPostController())
  );

  router.post(
    '/posts/:id/rate',
    ExpressRouteAdapter.adapt(buildRatePostController())
  );

  router.delete(
    '/posts/:id',
    ExpressRouteAdapter.adapt(buildDeletePostController())
  );
}
