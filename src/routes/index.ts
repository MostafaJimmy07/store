import { Router } from 'express';
import usersRoutes from './api/users.routes';
import prodctsRoutes from './api/products.routes';
import ordersRoutes from './api/orders.route';

const router = Router();

router.use('/users', usersRoutes);
router.use('/products', prodctsRoutes);
router.use('/orders', ordersRoutes);
export default router;
