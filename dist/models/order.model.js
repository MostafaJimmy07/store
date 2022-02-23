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
class OrderModel {
    constructor() {
        ///////////////////////////////CREATE ORDER/////////////////////////////////////////////////////
        this.create = (order) => __awaiter(this, void 0, void 0, function* () {
            let status = order.status;
            if (typeof status === 'undefined') {
                status = 'active';
            }
            try {
                const connect = yield database_1.default.connect();
                const checkQuery = `SELECT * FROM orders WHERE user_id = ($1) AND status = 'active'`;
                const checkActiveQueryRes = yield connect.query(checkQuery, [
                    order.user_id,
                ]);
                if (checkActiveQueryRes.rows[0]) {
                    connect.release();
                    throw new Error('an active order for this user already exists');
                }
                else {
                    const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
                    const result = yield connect.query(sql, [order.user_id, status]);
                    connect.release();
                    const newOrder = result.rows[0];
                    return newOrder;
                }
            }
            catch (err) {
                throw new Error(`Could not create new order ${order}. ${err}`);
            }
        });
        /////////////////////////////////SHOW ORDERS///////////////////////////////////////////////////////
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield connect.query(sql);
                connect.release();
                const orders = result.rows;
                return orders;
            }
            catch (err) {
                throw new Error(`Could not find orders. ${err}`);
            }
        });
        ///////////////////////////////SHOW ORDER BY ORDER ID////////////////////////////////////////////////////
        this.show = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const result = yield connect.query(sql, [id]);
                connect.release();
                const order = result.rows[0];
                return order;
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. ${err}`);
            }
        });
        /////////////////////////////////////////////////
    }
    ////////////////////////Get all order by user id//////////////////////////////////////////////
    AllOrderByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders WHERE user_id=($1)';
                const result = yield connect.query(sql, [userId]);
                connect.release();
                const orders = result.rows;
                return orders;
            }
            catch (err) {
                throw new Error(`Could not get active order. Error: ${err}`);
            }
        });
    }
    ///////////////////////GET Active order by user id//////////////////////////////////////////////
    getActiveOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE status='active' AND user_id=$1";
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get completed orders. Error: ${err}`);
            }
        });
    }
    //////////////////////////////////////////////////////////////////////////////
    getCompleteOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE status='complete' AND user_id=$1";
                const result = yield conn.query(sql, [userId]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not get completed orders. Error: ${err}`);
            }
        });
    }
    /////////////////////////////////////////////////////////////////////////////////
    addProductToOrder(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const orderQuery = "SELECT id FROM orders WHERE user_id = ($1) AND status = 'active'";
                const orderResult = yield connect.query(orderQuery, [userId]);
                const orderId = orderResult.rows[0].id;
                if (orderId) {
                    const addProductQuery = 'INSERT INTO order_products (product_id, quantity, order_id) VALUES ($1, $2, $3) RETURNING * ';
                    const result = yield connect.query(addProductQuery, [
                        productId,
                        quantity,
                        orderId,
                    ]);
                    connect.release();
                    const newOrder = result.rows[0];
                    return newOrder;
                }
                else {
                    connect.release();
                    console.error(`There are no active orders for user ${userId}`);
                }
            }
            catch (err) {
                throw new Error(`Cannot add product ${productId} to order: ${err}`);
            }
        });
    }
}
exports.default = OrderModel;
