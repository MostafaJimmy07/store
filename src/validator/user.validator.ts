import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
const userModel = new UserModel();

///////////////////////////////////////validate login request////////////////////////////////////////
export const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_name, password } = req.body;

  const errorsBag = [];

  if (!user_name) {
    errorsBag.push('Username is required');
  }

  if (!password) {
    errorsBag.push('Password is required');
  }

  if (errorsBag.length > 0) {
    res.status(422).json({
      message: 'Invalid input',
      errors: errorsBag,
    });
    return;
  }

  next();
};

////////////////////////////////// validate register request///////////////////////////////////
export const validateRegisterRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_name, first_name, last_name, password } = req.body;

  const errorsBag = [];

  if (!user_name) {
    errorsBag.push('Username is required');
  } else {
    // check if username is already taken
    if (await userModel.show(user_name)) {
      errorsBag.push('Username is already taken');
    }
  }
  /////////////
  if (!first_name) {
    errorsBag.push('First name is required');
  }
  //////////////////////////
  if (!last_name) {
    errorsBag.push('Last name is required');
  }
  ///////////////////////
  if (!password) {
    errorsBag.push('Password is required');
  } else {
    if (password.length < 8) {
      errorsBag.push('Password must be at least 8 characters long');
    }
  }
  /////////////////////////
  if (errorsBag.length > 0) {
    res.status(422).json({
      message: 'Invalid input',
      errors: errorsBag,
    });
    return;
  }
  next();
};
