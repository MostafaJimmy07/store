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
const database_1 = __importDefault(require("../../database/database"));
const userModel = new user_model_1.default();
describe('User Model', () => {
    /////////////////////////////////////////////////////////////////////////////////////////
    describe('Test Methods Exist', () => {
        it('should have a create method', () => {
            expect(userModel.create).toBeDefined();
        });
        it('should have an index method', () => {
            expect(userModel.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(userModel.showById).toBeDefined();
        });
        it('should have a Authenticate method', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    /////////////////////////////////////////////////////////////////////////////////////////
    describe('Test User Model Logic', () => {
        const user = {
            user_name: 'testUser',
            first_name: 'Test',
            last_name: 'User',
            passwrod: '12345678',
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userModel.create(user);
            user.id = createdUser.id;
        }));
        ///////////////////////
        it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userModel.create({
                user_name: 'test2User',
                first_name: 'Test',
                last_name: 'User',
                password: '87654321',
            });
            expect(createdUser).toEqual(jasmine.objectContaining({
                id: createdUser.id,
                user_name: 'test2User',
                first_name: 'Test',
                last_name: 'User',
            }));
        }));
        ///////////////////////
        it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield userModel.index();
            expect(users.length).toBe(2);
        }));
        ///////////////////////
        it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
            const specificUser = yield userModel.showById(user.id);
            expect(specificUser.id).toBe(user.id);
            expect(specificUser.user_name).toBe(user.user_name);
            expect(specificUser.first_name).toBe(user.first_name);
            expect(specificUser.last_name).toBe(user.last_name);
        }));
        ///////////////////////
        it('Authenticate method should return the Authenticated user', () => __awaiter(void 0, void 0, void 0, function* () {
            const AuthenticateUser = yield userModel.authenticate(user.user_name, user.password);
            expect(AuthenticateUser.id).toBe(user.id);
            expect(AuthenticateUser.user_name).toBe(user.user_name);
            expect(AuthenticateUser.first_name).toBe(user.first_name);
            expect(AuthenticateUser.last_name).toBe(user.last_name);
        }));
        ////////////////////////////////
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            yield connection.query('DELETE FROM users;');
            yield connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;');
            connection.release();
        }));
    });
});
