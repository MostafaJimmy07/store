import { Router } from 'express';
import * as controllers from '../../controllers/orders.controllers';
import { verifyAuthToken } from '../../utils/jwtAuthentication';
const orderRoutes = Router();
orderRoutes.post('/create', verifyAuthToken, controllers.create);
orderRoutes.get('/index', verifyAuthToken, controllers.index);
orderRoutes.get('/show/:id', verifyAuthToken, controllers.show);
orderRoutes.get('/users/:id/orders', verifyAuthToken, controllers.usersOrders);
orderRoutes.get(
  '/users/:id/active',
  verifyAuthToken,
  controllers.userActiveOrder
);
orderRoutes.get(
  '/users/:id/completed',
  verifyAuthToken,
  controllers.userCompleteOrder
);
orderRoutes.post('/:id/products', verifyAuthToken, controllers.addProduct);

export default orderRoutes;
