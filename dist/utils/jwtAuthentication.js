"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const verifyAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const tokenFromHeader = authorizationHeader
            ? authorizationHeader.split(' ')[1]
            : '';
        const token = jsonwebtoken_1.default.verify(tokenFromHeader, TOKEN_SECRET);
        if (!token) {
            throw new Error();
        }
        /* const payload = jwt.decode(token as string)
        const user=await userModel.show(payload?.sub as string)
        if(!user) throw new Error  */
        next();
    }
    catch (err) {
        console.log(err);
        res.status(401);
        res.json('Access denied, invalid token');
    }
});
exports.verifyAuthToken = verifyAuthToken;
