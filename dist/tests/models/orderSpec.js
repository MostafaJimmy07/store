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
const user_model_1 = __importDefault(require("../../models/user.model"));
const Orderstore = new order_model_1.default();
const Userstore = new user_model_1.default();
let order;
let user;
describe('Order Model', () => {
    describe('should have CRUD methods', () => {
        it('should have an index method', () => {
            expect(Orderstore.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(Orderstore.show).toBeDefined();
        });
        it('should have a create method', () => {
            expect(Orderstore.create).toBeDefined();
        });
    });
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Userstore.create({
            user_name: 'ahmed',
            first_name: 'gamal',
            last_name: 'mostafa',
            password: '12345678',
        });
        user = result;
    }));
    ////////////////////////////////////////////////////////////////
    it('create method should add a order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Orderstore.create({
            user_id: `${user.id}`,
            status: 'active',
        });
        order = result;
        expect(result).toEqual({
            id: order.id,
            user_id: `${user.id}`,
            status: 'active',
        });
    }));
    ////////////////////////////////////////////////////////////////
    it('index method should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Orderstore.index();
        expect(result[0]).toEqual({
            id: order.id,
            user_id: `${user.id}`,
            status: 'active',
        });
    }));
    ////////////////////////////////////////////////////////////////
    it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Orderstore.show(`${user.id}`);
        expect(result).toEqual({
            id: order.id,
            user_id: `${user.id}`,
            status: 'active',
        });
    }));
});
