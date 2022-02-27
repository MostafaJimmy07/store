"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = exports.createAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { TOKEN_SECRET } = process.env;
////////////////////////////////CREATE JWT/////////////////////////////////////////////////////
const createAuthToken = (user_name) => {
    return jsonwebtoken_1.default.sign({ sub: user_name }, TOKEN_SECRET);
};
exports.createAuthToken = createAuthToken;
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
const verifyAuthToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            //console.log('Tokenbefore : ', authHeader);
            const bearer = authHeader.split(' ')[0].toLowerCase();
            const token = authHeader.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decode = jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
                if (decode) {
                    // console.log('TokenAfter : ', decode);
                    next();
                }
                else {
                    // Failed to authenticate user.
                    throw new Error();
                }
            }
            else {
                // token type not bearer
                throw new Error();
            }
        }
        ////////////////////
        else {
            // No Token Provided.
            throw new Error();
        }
    }
    catch (err) {
        console.log(err);
        res.status(401);
        res.json('Access denied, invalid token');
    }
};
exports.verifyAuthToken = verifyAuthToken;
