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
const product_model_1 = __importDefault(require("../../models/product.model"));
const store = new product_model_1.default();
let product;
describe('Product Model', () => {
    describe('should have CRUD methods', () => {
        it('should have an index method', () => {
            expect(store.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(store.showById).toBeDefined();
        });
        it('should have a create method', () => {
            expect(store.create).toBeDefined();
        });
    });
    ////////////////////////////////////////////////////////////////
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            name: 'Apple12',
            price: 2000,
            category: 'mobile',
        });
        product = result;
        expect(result).toEqual({
            id: product.id,
            name: 'Apple12',
            price: 2000,
            category: 'mobile',
        });
        product = result;
    }));
    ////////////////////////////////////////////////////////////////
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([
            {
                id: product.id,
                name: 'Apple12',
                price: 2000,
                category: 'mobile',
            },
        ]);
    }));
    ////////////////////////////////////////////////////////////////
    it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.showById(product.id);
        expect(result).toEqual({
            id: product.id,
            name: 'Apple12',
            price: 2000,
            category: 'mobile',
        });
    }));
});
