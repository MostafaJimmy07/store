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
const product_model_1 = __importDefault(require("../../models/product.model"));
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database/database"));
const userModel = new user_model_1.default();
const productModel = new product_model_1.default();
const request = (0, supertest_1.default)(server_1.default);
let token = '';
describe('Product API EndPoint', () => {
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
    describe('Test Authentication For Get Token To Create Product', () => {
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
            //console.log('Result', res.body);
            expect(id).toBe(user.id);
            expect(user_name).toBe('testUser');
            token = userToken;
            //console.log('Token :', token);
        }));
    });
    describe('Test API methods', () => {
        it('should create new Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/products/create')
                .send({
                name: 'Appli13',
                price: 3000,
                category: 'Mobile',
            })
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            // console.log('Result', res.body);
            const { name, price, category } = res.body.result;
            expect(name).toBe('Appli13');
            expect(price).toBe(3000);
            expect(category).toBe('Mobile');
        }));
        /////////////////////////////////////
        it('should create another Product', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/products/create')
                .send({
                name: 'Appli11',
                price: 4000,
                category: 'Mobile',
            })
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            // console.log('Result', res.body);
            const { name, price, category } = res.body.result;
            expect(name).toBe('Appli11');
            expect(price).toBe(4000);
            expect(category).toBe('Mobile');
        }));
        //////////////////////////
        it('should Get list of Products', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/products/index')
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            //console.log('Length', res.body.result.length);
        }));
        /////////////////////////////////////
        it('should get Product info', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/api/products/show/1`)
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            //console.log('Result', res.body);
            expect(res.status).toBe(200);
            const { name } = res.body.result;
            expect(name).toBe('Appli13');
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        yield connection.query('DELETE FROM users;');
        yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
        yield connection.query('DELETE FROM products;');
        yield connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
        connection.release();
    }));
});
