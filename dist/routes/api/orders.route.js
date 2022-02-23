"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers = __importStar(require("../../controllers/orders.controllers"));
const jwtAuthentication_1 = require("../../utils/jwtAuthentication");
const orderRoutes = (0, express_1.Router)();
orderRoutes.post('/create', jwtAuthentication_1.verifyAuthToken, controllers.create);
orderRoutes.get('/index', jwtAuthentication_1.verifyAuthToken, controllers.index);
orderRoutes.get('/show/:id', jwtAuthentication_1.verifyAuthToken, controllers.show);
orderRoutes.get('/users/:id/orders', jwtAuthentication_1.verifyAuthToken, controllers.usersOrders);
orderRoutes.get('/users/:id/active', jwtAuthentication_1.verifyAuthToken, controllers.userActiveOrder);
orderRoutes.get('/users/:id/completed', jwtAuthentication_1.verifyAuthToken, controllers.userCompleteOrder);
orderRoutes.post('/:id/products', jwtAuthentication_1.verifyAuthToken, controllers.addProduct);
exports.default = orderRoutes;
