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
class ProductModel {
    ////////////////////////////////CREATE PRODUCT/////////////////////////////////////////////////////
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING * ';
                const result = yield connect.query(sql, [
                    product.name,
                    product.price,
                    product.category,
                ]);
                const newProduct = result.rows[0];
                connect.release();
                return newProduct;
            }
            catch (err) {
                throw new Error(`Cannot add product ${product.name}: ${err}`);
            }
        });
    }
    /////////////////////////////////SHOW PRODUCTS///////////////////////////////////////////////////////
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = `SELECT * FROM products`;
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not find users. ${err}`);
            }
        });
    }
    ///////////////////////////////SHOW PRODUCT BY ID////////////////////////////////////////////////////////
    showById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find product ${id}. ${err}`);
            }
        });
    }
}
exports.default = ProductModel;
