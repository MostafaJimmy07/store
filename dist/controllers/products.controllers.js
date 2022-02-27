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
exports.show = exports.index = exports.create = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const productModel = new product_model_1.default();
////////////////////////////////CREATE////////////////////////////////////////////
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        const newProduct = yield productModel.create(product);
        res.json({
            status: 'success',
            result: Object.assign({}, newProduct),
            message: 'Product Created Successfully',
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`${err}`);
    }
});
exports.create = create;
//////////////////////INDEX(SHOW ALL PRODUCTS)////////////////////////////////////////
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel.index();
        if (!products) {
            res.json({ message: 'Products Not Found' });
        }
        else {
            res.json({
                status: 'success',
                result: Object.assign({}, products),
                message: 'Products retrieved successfully',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            error: (error !== null && error !== void 0 ? error : null),
        });
    }
});
exports.index = index;
///////////////////////////////SHOW PRODUCT BY ID////////////////////////////////////////////////////////
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = yield productModel.showById(id);
        if (!product) {
            res.json({ message: 'Product Not Found' });
        }
        else {
            res.json({
                status: 'success',
                result: Object.assign({}, product),
                message: 'Product retrieved successfully',
            });
        }
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            error: (error !== null && error !== void 0 ? error : null),
        });
    }
});
exports.show = show;
