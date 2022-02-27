"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const index_1 = __importDefault(require("./routes/index"));
//import usersRoute from './controllers/users.controllers';
const app = (0, express_1.default)();
const port = process.env.port || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//app.use(morgan('common'));
app.use((0, helmet_1.default)());
app.get('/', (req, res) => {
    res.json('Hello Shopping World!');
});
app.use('/api', index_1.default);
app.listen(port, () => {
    console.log(`Server Is Running on Port ${port}`);
});
exports.default = app;
