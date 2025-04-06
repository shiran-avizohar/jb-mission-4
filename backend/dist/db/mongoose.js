"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = connect;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const { host, port, database } = config_1.default.get('mongoose');
async function connect() {
    try {
        await mongoose_1.default.connect(`mongodb://${host}:${port}/${database}`);
        console.log('connected to mongo....');
    }
    catch (e) {
        console.log(e);
    }
}
exports.default = mongoose_1.default;
