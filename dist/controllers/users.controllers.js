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
exports.show = exports.index = exports.login = exports.register = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwtAuthentication_1 = require("../utils/jwtAuthentication");
dotenv_1.default.config();
const userModel = new user_model_1.default();
/////////////////////////////////SIGNUP(register)/////////////////////////////////////////////////////
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    try {
        const newUser = yield userModel.create(user);
        const token = (0, jwtAuthentication_1.createAuthToken)(newUser.user_name);
        res.json({
            status: 'success',
            data: Object.assign({}, newUser),
            message: 'User Created Successfully',
            token: token,
        });
    }
    catch (error) {
        res.status(500).send({
            message: 'Internal server error',
            error: (error !== null && error !== void 0 ? error : null),
        });
    }
});
exports.register = register;
///////////////////////////////////LOGIN//////////////////////////////////////////////////////////////
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_name, password } = req.body;
        const user = yield userModel.authenticate(user_name, password);
        if (!user) {
            res.json({ message: 'Invalid username and/or password' });
        }
        else {
            const token = (0, jwtAuthentication_1.createAuthToken)(user.user_name);
            res.json({
                result: user,
                token: token,
                message: 'Success Login',
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
exports.login = login;
//////////////////////////////INDEX(GET ALL USERS)////////////////////////////////////////////////////
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel.index();
        if (!users) {
            res.json({ message: 'Users Not Found' });
        }
        else {
            res.json({ message: 'success', data: users });
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
//////////////////////////////////SHOW BY ID/////////////////////////////////////////////////////////
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const user = yield userModel.showById(id);
        if (!user) {
            res.json({ message: 'User Not Found' });
        }
        else {
            res.json({ message: 'Success', data: user });
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
