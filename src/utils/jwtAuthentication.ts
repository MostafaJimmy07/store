import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
const { TOKEN_SECRET } = process.env;
////////////////////////////////CREATE JWT/////////////////////////////////////////////////////
export const createAuthToken = (user_name: string): string => {
  return jwt.sign({ sub: user_name }, TOKEN_SECRET as unknown as string);
};
////////////////////////////////VERIFY JWT/////////////////////////////////////////////////////
/* export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const tokenFromHeader = authorizationHeader
      ? authorizationHeader.split(' ')[1]
      : '';
    const token = jwt.verify(
      tokenFromHeader,
      TOKEN_SECRET as unknown as jwt.Secret
    );
    if (!token) {
      throw new Error();
    }

    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    res.json('Access denied, invalid token');
  }
}; */

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      //console.log('Tokenbefore : ', authHeader);
      const bearer = authHeader.split(' ')[0].toLowerCase();
      const token = authHeader.split(' ')[1];
      if (token && bearer === 'bearer') {
        const decode = jwt.verify(token, TOKEN_SECRET as unknown as jwt.Secret);
        if (decode) {
          // console.log('TokenAfter : ', decode);
          next();
        } else {
          // Failed to authenticate user.
          throw new Error();
        }
      } else {
        // token type not bearer
        throw new Error();
      }
    }
    ////////////////////
    else {
      // No Token Provided.
      throw new Error();
    }
  } catch (err) {
    console.log(err);
    res.status(401);
    res.json('Access denied, invalid token');
  }
};
