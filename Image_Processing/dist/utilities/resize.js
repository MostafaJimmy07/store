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
const fs_1 = __importDefault(require("fs"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const ROOT_PATH = path_1.default.resolve(__dirname, '../');
//console.log('Root', ROOT_PATH);
const THUMBS_PATH = `${ROOT_PATH}/thumb`;
const resize = (filename, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    let resizedImagePath;
    let errorMessage;
    const fullImage = `${ROOT_PATH}/image/${filename}.jpg`;
    const thumbImage = `${THUMBS_PATH}/${filename}_${width}_${height}.jpg`;
    if (fs_1.default.existsSync(thumbImage)) {
        resizedImagePath = thumbImage;
    }
    else {
        if (fs_1.default.existsSync(fullImage)) {
            console.log('Processing image');
            yield (0, sharp_1.default)(fullImage)
                .resize(width, height)
                .toFile(thumbImage)
                .then(() => {
                resizedImagePath = thumbImage;
            })
                .catch((error) => (errorMessage = error));
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            errorMessage = "File doesn't exists";
        }
    }
    return resizedImagePath;
});
exports.default = resize;
