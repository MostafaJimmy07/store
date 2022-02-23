import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import {
  validateLoginRequest,
  validateRegisterRequest,
} from '../../validator/user.validator';
import { verifyAuthToken } from '../../utils/jwtAuthentication';
const userRoutes = Router();

userRoutes.post('/create', validateRegisterRequest, controllers.register);
userRoutes.post('/login', validateLoginRequest, controllers.login);
userRoutes.get('/index', verifyAuthToken, controllers.index);
userRoutes.get('/show/:id', verifyAuthToken, controllers.show);

export default userRoutes;
