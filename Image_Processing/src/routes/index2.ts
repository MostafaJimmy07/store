import express from 'express';
import Images from './api/images';

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Main API index');
});

routes.use('/images/resize', Images);

export default routes;
