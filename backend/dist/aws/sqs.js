"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueUrl = void 0;
exports.createAppQueueIfNotExist = createAppQueueIfNotExist;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const config_1 = __importDefault(require("config"));
// read the config of s3, and clone it deeply
const sqsConfig = JSON.parse(JSON.stringify(config_1.default.get('sqs.connection')));
// if we're NOT running localstack, i.e. we want to run against AWS PRODUCTION servers
// then we MUST delete the `endpoint` property from the config object
if (!config_1.default.get('sqs.isLocalstack'))
    delete sqsConfig.endpoint;
// init the client
const sqsClient = new client_sqs_1.SQSClient(sqsConfig);
exports.queueUrl = '';
async function createAppQueueIfNotExist() {
    try {
        const queue = await sqsClient.send(new client_sqs_1.CreateQueueCommand({
            QueueName: config_1.default.get('sqs.queueName')
        }));
        exports.queueUrl = queue.QueueUrl;
    }
    catch (e) {
        // ignore
        console.log('Queue probably already exist');
    }
}
exports.default = sqsClient;
