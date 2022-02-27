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
const order_model_1 = __importDefault(require("../../models/order.model"));
const database_1 = __importDefault(require("../../database/database"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const userModel = new user_model_1.default();
const orderModel = new order_model_1.default();
describe(' Order Model', () => {
    /////////////////////////////////////////////////
    describe('Test Methods Exist', () => {
        it('should have a create method', () => {
            expect(orderModel.create).toBeDefined();
        });
        it('should have an index method', () => {
            expect(orderModel.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(orderModel.show).toBeDefined();
        });
        it('should have a getAllOrderBYUserId method', () => {
            expect(orderModel.AllOrderByUserId).toBeDefined();
        });
        it('should have a getActiveOrderBYUserId method', () => {
            expect(orderModel.getActiveOrdersByUserId).toBeDefined();
        });
        it('should have a getCompleteOrderBYUserId method', () => {
            expect(orderModel.getCompleteOrdersByUserId).toBeDefined();
        });
        it('should have a AddProductToOrder method', () => {
            expect(orderModel.addProductToOrder).toBeDefined();
        });
    });
    /////////////////////////////////////////////////////////////////////
    describe('Test Order Model Logic', () => {
        const user = {
            user_name: 'test3User',
            first_name: 'Test',
            last_name: 'User',
            passwrod: '98765432',
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userModel.create(user);
            user.id = createdUser.id;
            const order = {
                user_id: `${user.id}`,
                status: 'complete',
            };
            const createdOrder = yield orderModel.create(order);
            order.id = createdOrder.id;
        }));
        //////////////////////////////////////////////////////////
        it('create method should add a NewOrder', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdOrder = yield orderModel.create({
                user_id: user.id,
                status: 'active',
            });
            expect(createdOrder).toEqual(jasmine.objectContaining({
                id: createdOrder.id,
                user_id: `${user.id}`,
                status: 'active',
            }));
        }));
        //////////////////////////////////////////////////////////
        it('index method should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const orders = yield orderModel.index();
            expect(orders.length).toBe(2);
        }));
        //////////////////////////////////////////////////////////
        it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
            const specificOrder = yield orderModel.AllOrderByUserId(user.id);
            expect(specificOrder.length).toBe(2);
        }));
        //////////////////////////////////////////////////////////
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            yield connection.query('DELETE FROM orders;');
            yield connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
            yield connection.query('DELETE FROM users;');
            yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
            connection.release();
        }));
    });
});
