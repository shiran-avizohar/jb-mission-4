"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = fileUploader;
const lib_storage_1 = require("@aws-sdk/lib-storage");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const config_1 = __importDefault(require("config"));
const s3_1 = __importDefault(require("../aws/s3"));
const sqs_1 = __importStar(require("../aws/sqs"));
const client_sqs_1 = require("@aws-sdk/client-sqs");
async function fileUploader(req, res, next) {
    if (!req.files.postImage)
        return next();
    const postImage = req.files.postImage;
    const upload = new lib_storage_1.Upload({
        client: s3_1.default,
        params: {
            Bucket: config_1.default.get('s3.bucket'),
            Key: `${(0, uuid_1.v4)()}${path_1.default.extname(postImage.name)}`,
            Body: postImage.data,
            ContentType: postImage.mimetype
        }
    });
    const response = await upload.done();
    console.log(response);
    const sqsResponse = await sqs_1.default.send(new client_sqs_1.SendMessageCommand({
        QueueUrl: sqs_1.queueUrl,
        MessageBody: JSON.stringify({
            bucket: response.Bucket,
            key: response.Key
        })
    }));
    console.log(sqsResponse);
    // req.imageUrl = response.Location
    req.imageUrl = `${response.Bucket}/${response.Key}`;
    next();
}
