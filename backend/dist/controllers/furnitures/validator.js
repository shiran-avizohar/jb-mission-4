"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newFurnitureValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.newFurnitureValidator = joi_1.default.object({
    type: joi_1.default.string().min(3).required(),
    size: joi_1.default.string().min(10).required(),
    price: joi_1.default.number().min(0).required(),
    color: joi_1.default.string().min(3).required(),
});
