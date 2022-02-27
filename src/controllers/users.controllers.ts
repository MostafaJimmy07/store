import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import dotenv from 'dotenv';
import { createAuthToken } from '../utils/jwtAuthentication';
dotenv.config();
const userModel = new UserModel();
/////////////////////////////////SIGNUP(register)/////////////////////////////////////////////////////
export const register = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const newUser = await userModel.create(user);
    // const token = createAuthToken(newUser.user_name);
    res.json({
      status: 'success',
      result: { ...newUser },
      message: 'User Created Successfully',
      //token: token,
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      error: (error ?? null) as string,
    });
  }
};
///////////////////////////////////LOGIN//////////////////////////////////////////////////////////////
export const login = async (req: Request, res: Response) => {
  try {
    const { user_name, password } = req.body;
    const user = await userModel.authenticate(user_name, password);
    if (!user) {
      res.json({ message: 'Invalid username and/or password' });
    } else {
      const token = createAuthToken(user.user_name);
      res.json({
        result: user,
        token: token,
        message: 'Success Login',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      error: (error ?? null) as string,
    });
  }
};
//////////////////////////////INDEX(GET ALL USERS)////////////////////////////////////////////////////
export const index = async (req: Request, res: Response) => {
  try {
    const users = await userModel.index();
    if (!users) {
      res.json({ message: 'Users Not Found' });
    } else {
      res.json({
        status: 'success',
        result: users,
        message: 'User retrieved successfully',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      error: (error ?? null) as string,
    });
  }
};
//////////////////////////////////SHOW BY ID/////////////////////////////////////////////////////////
export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await userModel.showById(id);
    if (!user) {
      res.json({ message: 'User Not Found' });
    } else {
      res.json({
        status: 'success',
        result: user,
        message: 'User retrieved successfully',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
      error: (error ?? null) as string,
    });
  }
};
