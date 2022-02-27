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
const resize_1 = __importDefault(require("../utilities/resize"));
const path_1 = __importDefault(require("path"));
//import ROOT_PATH from '../utilities/resize';
const fs_1 = __importDefault(require("fs"));
const ROOT_PATH = path_1.default.resolve(__dirname, '../');
console.log('Root', ROOT_PATH);
const THUMBS_PATH = `${ROOT_PATH}/thumb`;
describe('Test ImageProcessing utility', () => {
    let file;
    let filename;
    beforeAll(() => {
        filename = 'hi';
        file = `${ROOT_PATH}/image/${filename}.jpg`;
    });
    //////////////////////////////////////////////////////////////////////////////////////
    it('should return true if image exists', function () {
        expect(fs_1.default.existsSync(file)).toBeTruthy();
    });
    //////////////////////////////////////////////////////////////////////////////////////
    it('Should return a processed image', () => __awaiter(void 0, void 0, void 0, function* () {
        const width = 1000;
        const height = 600;
        const processedImage = yield (0, resize_1.default)(filename, width, height);
        expect(processedImage).toEqual(`${THUMBS_PATH}/${filename}_${width}_${height}.jpg`);
        expect(processedImage).toBeDefined();
    }));
    //////////////////////////////////////////////////////////////////////////////////////
});
