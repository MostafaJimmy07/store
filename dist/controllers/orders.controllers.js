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
exports.addProduct = exports.userCompleteOrder = exports.userActiveOrder = exports.usersOrders = exports.show = exports.index = exports.create = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const orderModel = new order_model_1.default();
////////////////////////////////CREATE ORDER////////////////////////////////////////////
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = req.body;
    if (order.user_id == '' || typeof order.user_id == 'undefined') {
        res.json('Invalid arguments. Requires id of user for making order.');
        return;
    }
    if (order.status == '' || typeof order.status == 'undefined') {
        res.json('Invalid arguments. Requires status of order for making order.');
        return;
    }
    try {
        const newOrder = yield orderModel.create(order);
        res.json({
            status: 'success',
            data: Object.assign({}, newOrder),
            message: 'Order Created Successfully',
        });
    }
    catch (err) {
        res.status(400);
        res.json({ error: `${err}` });
    }
});
exports.create = create;
//////////////////////INDEX(GET ALL ORDERS)////////////////////////////////////////
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orderModel.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `${err}` });
    }
});
exports.index = index;
///////////////////////////////GET ORDERS BY Order ID//////////////////////////////////////////////
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const order = yield orderModel.show(id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `${err}` });
    }
});
exports.show = show;
/////////////////////////////GET ALL Order BY UserID///////////////////////////////////////////////////
const usersOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const activeOrder = yield orderModel.AllOrderByUserId(userId);
        res.json(activeOrder);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `${err}` });
    }
});
exports.usersOrders = usersOrders;
//////////////////////////////////GET Active Order BY UserID////////////////////////////////////////
const userActiveOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const activeOrder = yield orderModel.getActiveOrdersByUserId(userId);
        res.json(activeOrder);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `${err}` });
    }
});
exports.userActiveOrder = userActiveOrder;
//////////////////////////////////GET Complete Order BY UserID///////////////////////////////////////
const userCompleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const activeOrder = yield orderModel.getCompleteOrdersByUserId(userId);
        res.json(activeOrder);
    }
    catch (err) {
        res.status(400);
        res.json({ error: `${err}` });
    }
});
exports.userCompleteOrder = userCompleteOrder;
///////////////////////////////////////ADD PRODUCT TO ORDER//////////////////////////////////////////
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { productId, quantity } = req.body;
        const orderDetails = yield orderModel.addProductToOrder(userId, productId, quantity);
        res.json(orderDetails);
    }
    catch (err) {
        console.error(err);
        res.status(500).send(`${err}`);
    }
});
exports.addProduct = addProduct;
