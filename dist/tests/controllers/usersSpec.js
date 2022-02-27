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
describe('User API Endpoints', () => {
    const user = {
        user_name: 'holako',
        first_name: 'ahmed',
        last_name: 'gamal',
        password: '87654321',
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createdUser = yield userModel.create(user);
        user.id = createdUser.id;
    }));
    ////////////////////////////////////////////////////////////////
    describe('Test Login & Authenticate methods', () => {
        it('should be able to login & authenticate to get token', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/login')
                .set('Content-type', 'application/json')
                .send({
                user_name: 'holako',
                password: '87654321',
            });
            expect(res.status).toBe(200);
            const { id, user_name } = res.body.result;
            const { token: userToken } = res.body;
            //console.log('Result', res.body);
            expect(id).toBe(user.id);
            expect(user_name).toBe('holako');
            token = userToken;
            //console.log('Token :', token);
        }));
        /////////////////////
        it('should failed to login & authenticate with wrong userName', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/login')
                .set('Content-type', 'application/json')
                .send({
                user_name: 'jimmy',
                password: '12345678',
            });
            expect(res.status).toBe(200);
        }));
    });
    ///////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    describe('Test API methods', () => {
        it('should create new user', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .post('/api/users/create')
                .set('Content-type', 'application/json')
                .send({
                user_name: 'testUser',
                first_name: 'Test',
                last_name: 'User',
                password: '12345678',
            });
            expect(res.status).toBe(200);
            const { user_name, first_name, last_name } = res.body.result;
            //console.log('Result', res.body);
            expect(user_name).toBe('testUser');
            expect(first_name).toBe('Test');
            expect(last_name).toBe('User');
        }));
        ////////////////
        it('should get list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get('/api/users/index')
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            expect(res.status).toBe(200);
            //console.log('Length', res.body.result.length);
            expect(res.body.result.length).toBe(2);
        }));
        ////////////////
        it('should get user info', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request
                .get(`/api/users/show/${user.id}`)
                .send({ token: token })
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`);
            //console.log('Result', res.body);
            expect(res.status).toBe(200);
            const { user_name } = res.body.result;
            expect(user_name).toBe('holako');
        }));
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const connection = yield database_1.default.connect();
        yield connection.query('DELETE FROM users;');
        yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
        connection.release();
    }));
});
