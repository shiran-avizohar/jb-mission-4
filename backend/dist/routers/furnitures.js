"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("../controllers/furnitures/controller");
const validator_1 = require("../controllers/furnitures/validator");
const validation_1 = __importDefault(require("../middlewares/validation"));
const furnituresRouter = (0, express_1.Router)();
furnituresRouter.get('/', controller_1.getAll);
furnituresRouter.post('/', (0, validation_1.default)(validator_1.newFurnitureValidator), controller_1.create);
exports.default = furnituresRouter;
