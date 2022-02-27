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
const database_1 = __importDefault(require("../../database/database"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const productModel = new product_model_1.default();
describe('Product Model', () => {
    /////////////////////////////////////////////////////////////////////////////////////////
    describe('Test Methods Exist', () => {
        it('should have a create method', () => {
            expect(productModel.create).toBeDefined();
        });
        it('should have an index method', () => {
            expect(productModel.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(productModel.showById).toBeDefined();
        });
    });
    /////////////////////////////////////////////////////////////////////////////////////////
    describe('Test Product Model Logic', () => {
        const product = {
            name: 'Apple12',
            price: 2000,
            category: 'Mobile',
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const createdProduct = yield productModel.create(product);
            product.id = createdProduct.id;
        }));
        ////////////////////////
        it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const createdProduct = yield productModel.create({
                name: 'Apple13',
                price: 3000,
                category: 'Mobile',
            });
            expect(createdProduct).toEqual(jasmine.objectContaining({
                id: createdProduct.id,
                name: 'Apple13',
                price: 3000,
                category: 'Mobile',
            }));
        }));
        /////////////////////
        it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const products = yield productModel.index();
            expect(products.length).toBe(2);
        }));
        /////////////////////
        it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
            const specificProduct = yield productModel.showById(product.id);
            expect(specificProduct.id).toBe(product.id);
            expect(specificProduct.name).toBe(product.name);
            expect(specificProduct.price).toBe(product.price);
            expect(specificProduct.category).toBe(product.category);
        }));
        /////////////////////
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            yield connection.query('DELETE FROM products;');
            yield connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
            connection.release();
        }));
    });
});
