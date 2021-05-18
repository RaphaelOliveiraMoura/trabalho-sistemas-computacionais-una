import 'module-alias/register';
import { setupApplication } from '@/main/app';

setupApplication().then((app) => {
  // eslint-disable-next-line no-console
  app.listen(3333, () => console.log('Application running'));
});
