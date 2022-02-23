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
const store = new user_model_1.default();
let user;
describe('User Model', () => {
    describe('should have CRUD methods', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(store.show).toBeDefined();
        });
        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        });
    });
    ///////////////////////////////////////////////////////////////////////////////////////////////
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            user_name: 'gamal',
            first_name: 'mostafa',
            last_name: 'ahmed',
            password: '12345678',
        });
        user = result;
        expect(result).toEqual(jasmine.objectContaining({
            id: user.id,
            user_name: 'gamal',
            first_name: 'mostafa',
            last_name: 'ahmed',
        }));
    }));
    ////////////////////////////////////////////////////////////////
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toContain(jasmine.objectContaining({
            id: user.id,
            user_name: 'gamal',
            first_name: 'mostafa',
            last_name: 'ahmed',
        }));
    }));
    ////////////////////////////////////////////////////////////////
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show(user.id);
        expect(result).toEqual(jasmine.objectContaining({
            id: user.id,
            user_name: 'gamal',
            first_name: 'mostafa',
            last_name: 'ahmed',
        }));
    }));
});
