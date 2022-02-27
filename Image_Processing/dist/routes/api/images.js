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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const resize_1 = __importDefault(require("../../utilities/resize"));
const fs_1 = __importDefault(require("fs"));
const images = express_1.default.Router();
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { filename, width, height } = req.query;
    filename = filename;
    width = width;
    height = height;
    const ROOT_PATH = path_1.default.resolve(__dirname, '../../');
    console.log(ROOT_PATH);
    const fullImage = `${ROOT_PATH}/image/${filename}.jpg`;
    if (!fs_1.default.existsSync(fullImage)) {
        res.status(400).json({ errorMessage: 'This Image Doesn`t Exist' });
    }
    else if (!Number(width) || !Number(height)) {
        res.status(400).json({
            errorMessage: 'You Must Provide WIDTH or HEIGHT in the Form of Numbers',
        });
    }
    else if (!filename || !width || !height) {
        res.status(400).json({
            errorMessage: 'You must provide a file name, a width and a ' + 'height to process image resizing',
        });
    }
    else {
        const images = yield (0, resize_1.default)(filename, parseInt(width), parseInt(height));
        res.sendFile(path_1.default.resolve(__dirname, `${images}`));
    }
}));
exports.default = images;
