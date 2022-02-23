import { Router } from 'express';
import * as controllers from '../../controllers/products.controllers';
import { verifyAuthToken } from '../../utils/jwtAuthentication';
const productRoutes = Router();

productRoutes.post('/create', verifyAuthToken, controllers.create);
productRoutes.get('/index', controllers.index);
productRoutes.get('/show/:id', controllers.show);

export default productRoutes;
