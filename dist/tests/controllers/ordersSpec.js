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
const user_model_1 = __importDefault(require("../../models/user.model"));
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database/database"));
const userModel = new user_model_1.default();
const request = (0, supertest_1.default)(server_1.default);
let token = '';
describe('Order API EndPoint', () => {
    const user = {
        user_name: 'testUser',
        first_name: 'Test',
        last_name: 'User',
        password: '87654321',
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield userModel.create(user);
        user.id = createdUser.id;
    }));
    describe('Test Authentication For Get Token To Create Order', () => {
        it('should be able to login & authenticate to get token', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/login')
                .set('Content-Type', 'application/json')
                .send({
                user_name: 'testUser',
                password: '87654321',
            });
            expect(res.status).toBe(200);
            const { id, user_name } = res.body.result;
            const { token: userToken } = res.body;
            //console.log('USER', res.body);
            expect(id).toBe(1);
            expect(user_name).toBe('testUser');
            token = userToken;
            //console.log('Token :', token);
        }));
    });
    ///////////////////////////////////////////////////
    describe('Test API methods', () => {
        it('should create Order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/orders/create')
                .send({
                user_id: `${user.id}`,
                status: 'complete',
            })
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            // console.log('NEW ORDER', res.body);
            const { user_id, status } = res.body.result;
            expect(user_id).toBe(user_id);
            expect(status).toBe('complete');
        }));
        /////////////////////////////////////////////////////
        it('should create new Order', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/orders/create')
                .send({
                user_id: `${user.id}`,
                status: 'active',
            })
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            // console.log('NEW ORDER', res.body);
            const { user_id, status } = res.body.result;
            expect(user_id).toBe(user_id);
            expect(status).toBe('active');
        }));
        ////////////////////////////////////////////////////////////////////////
        it('should return All Orders by UserId', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/orders/users/1/orders')
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            //console.log('ALL ORDER', res.body);
        }));
        ////////////////////////////////////////
        it('should return AllCompletedOrders by UserId', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/api/orders/users/${user.id}/completed`)
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            // console.log('COMPLETED ORDER', res.body);
        }));
        ////////////////////////////////////////
        it('should return AllActiveOrders by UserId', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/api/orders/users/${user.id}/active`)
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            // console.log('ACTIVE ORDER', res.body);
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        yield connection.query('DELETE FROM orders;');
        yield connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;');
        yield connection.query('DELETE FROM users;');
        yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
        connection.release();
    }));
});
