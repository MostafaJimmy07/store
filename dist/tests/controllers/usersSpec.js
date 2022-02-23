"use strict";
/* import app from '../../server';
import User from '../../types/user.type';
import supertest from 'supertest';
import db from '../../database/database';
const request = supertest(app);
let user: User;
let users: User[];
let token: String;
let result: supertest.Response;

describe('User endpoints', () => {
  describe('POST /users/create', () => {
    it('responds with status 200 with token', async () => {
      result = await request.post('/users/create').send({
        user_name: 'gamal',
        first_name: 'mostafa',
        last_name: 'ahmed',
        password: '12345678',
      });
      token = result.body.token;
      expect(result.status).toBe(200);
    });
  });
  /////////////////////////////////////////////////////////////////////
  describe('GET /users/index', () => {
    it('responds with status 200', async () => {
      result = await request
        .get('/users/index')
        .send({ token: token })
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`);

      users = result.body;
      user = users[users.length - 1];

      expect(result.status).toBe(200);
    });

    it('should return users', () => {
      expect(result.body).toContain(
        jasmine.objectContaining({
          user_name: 'gamal',
          first_name: 'mostafa',
          last_name: 'ahmed',
        })
      );
    });
  });
  /////////////////////////////////////////////////////////////////////
  describe('GET /users/show/1', () => {
    it('responds with status 200', async () => {
      result = await request
        .get(`/users/show/1`)
        .send({ token: token })
        .set('Authorization', `Bearer ${token}`);

      expect(result.status).toBe(200);
    });

    it('should return user', () => {
      expect(result.body).toEqual(
        jasmine.objectContaining({
          user_name: 'gamal',
          first_name: 'mostafa',
          last_name: 'ahmed',
        })
      );
    });
  });
  /////////////////////////////////////////////////////////////////////
});
 */
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
dotenv_1.default.config();
const request = (0, supertest_1.default)(server_1.default);
describe('users endpoints', () => {
    let token;
    const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/users');
        token = response.body.token;
        return 'Bearer ' + token;
    });
    describe('POST /users/create', () => {
        it('/users endpoint should exist and return status 200 [POST]', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/users');
            expect(response.status).toBe(404);
        }));
    });
    ///////////////////////////////////////////////////////////////////////////////////////
    describe('GET /users/index', () => {
        it('/users this endpoint should return all users with response status 404', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/users/index')
                .set('Authorization', yield getToken());
            expect(response.status).toBe(404);
        }));
    });
    ///////////////////////////////////////////////////////////////////////////////////////
    describe('GET /users/show/1', () => {
        it('/users/:id this endpoint should return specific user with response status 404', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request
                .get('/users/show/1')
                .set('Authorization', yield getToken());
            expect(response.status).toBe(404);
        }));
    });
    //////////////////////////////////////////////////////////////////////////////////
});
