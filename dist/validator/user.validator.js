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
exports.validateRegisterRequest = exports.validateLoginRequest = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const userModel = new user_model_1.default();
///////////////////////////////////////validate login request////////////////////////////////////////
const validateLoginRequest = (req, res, next) => {
    const { user_name, password } = req.body;
    const errorsBag = [];
    if (!user_name) {
        errorsBag.push('Username is required');
    }
    if (!password) {
        errorsBag.push('Password is required');
    }
    if (errorsBag.length > 0) {
        res.status(422).json({
            message: 'Invalid input',
            errors: errorsBag,
        });
        return;
    }
    next();
};
exports.validateLoginRequest = validateLoginRequest;
////////////////////////////////// validate register request///////////////////////////////////
const validateRegisterRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, first_name, last_name, password } = req.body;
    const errorsBag = [];
    if (!user_name) {
        errorsBag.push('Username is required');
    }
    else {
        // check if username is already taken
        if (yield userModel.show(user_name)) {
            errorsBag.push('Username is already taken');
        }
    }
    /////////////
    if (!first_name) {
        errorsBag.push('First name is required');
    }
    //////////////////////////
    if (!last_name) {
        errorsBag.push('Last name is required');
    }
    ///////////////////////
    if (!password) {
        errorsBag.push('Password is required');
    }
    else {
        if (password.length < 8) {
            errorsBag.push('Password must be at least 8 characters long');
        }
    }
    /////////////////////////
    if (errorsBag.length > 0) {
        res.status(422).json({
            message: 'Invalid input',
            errors: errorsBag,
        });
        return;
    }
    next();
});
exports.validateRegisterRequest = validateRegisterRequest;
