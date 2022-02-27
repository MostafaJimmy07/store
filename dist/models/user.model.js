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
const database_1 = __importDefault(require("../database/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltrounds = process.env.SALT_ROUNDS;
class UserModel {
    //////////////////////////////////CREATE USER////////////////////////////////////////////////////////
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_name, first_name, last_name, password } = user;
            try {
                //open conn with DB
                const connect = yield database_1.default.connect();
                const sql = `INSERT INTO users (user_name , first_name , last_name ,password) 
                   VALUES ($1,$2,$3,$4) returning * `;
                //run query
                const hash = bcrypt_1.default.hashSync(password + pepper, parseInt(saltrounds));
                const result = yield connect.query(sql, [
                    user_name,
                    first_name,
                    last_name,
                    hash,
                ]);
                //realease conn
                connect.release();
                //return created user
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to create (${user.user_name}):${error.message}`);
            }
        });
    }
    //////////////////////////////////SHOW ALL USERS////////////////////////////////////////////////////
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `SELECT * FROM users`;
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not find users. ${err}`);
            }
        });
    }
    /////////////////////////////GET SPECIFIC USER BY ID//////////////////////////////////////////////////////
    showById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. ${err}`);
            }
        });
    }
    ///////////////////////////GET SPECIFIC USER BY USER_NAME OR ID//////////////////////////////////////////////
    show(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const column = typeof value == 'number' ? 'id' : 'user_name'; // detect query attribute
            const sql = `SELECT * FROM users WHERE ${column} = $1`;
            const result = yield database_1.default.query(sql, [value]);
            return result.rows[0];
        });
    }
    //////////////////////////////////authenticate user/////////////////////////////////////////////////
    authenticate(user_name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE user_name=($1)';
                const result = yield conn.query(sql, [user_name]);
                conn.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (!user) {
                        return null;
                    }
                    const match = bcrypt_1.default.compareSync(password + pepper, user.password);
                    if (!match) {
                        return null;
                    }
                    return user;
                }
                return null;
            }
            catch (err) {
                throw new Error(`Authentication failed. ${err}`);
            }
        });
    }
}
exports.default = UserModel;
