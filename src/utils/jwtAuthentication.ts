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
export const verifyAuthToken = async (
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
    /* const payload = jwt.decode(token as string)
    const user=await userModel.show(payload?.sub as string)
    if(!user) throw new Error  */
    next();
  } catch (err) {
    console.log(err);
    res.status(401);
    res.json('Access denied, invalid token');
  }
};
