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
const server_1 = __importDefault(require("../../server"));
const supertest_1 = __importDefault(require("supertest"));
const dotenv_1 = __importDefault(require("dotenv"));
const request = (0, supertest_1.default)(server_1.default);
dotenv_1.default.config();
describe('Products endpoints', () => {
    let token;
    const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/users');
        token = response.body.token;
        return 'Bearer ' + token;
    });
    /////////////////////////////////////////////////////////////////////////////////////////////
    describe('POST /products/create', () => {
        it('/products endpoint should responds with status 404 with token', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .post('/products/create')
                .set('Authorization', yield getToken());
            expect(response.status).toBe(404);
        }));
    });
    /////////////////////////////////////////////////////////////////////////////////////////////
    describe('GET /products/index', () => {
        it('/products/index this endpoint should return all products with response status 404', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/products/index');
            expect(response.status).toBe(404);
        }));
    });
    /////////////////////////////////////////////////////////////////////////////////////////////
    describe('GET /products/show/1', () => {
        it('/products/show/:id this endpoint should return specific product with response status 404', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/products/show/1');
            expect(response.status).toBe(404);
        }));
    });
});
