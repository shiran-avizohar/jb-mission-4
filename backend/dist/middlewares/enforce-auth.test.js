"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enforce_auth_1 = __importDefault(require("./enforce-auth"));
const app_error_1 = __importDefault(require("../errors/app-error"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("config"));
describe('enforce-auth middleware tests', () => {
    test('calls next with a 401 error when no authorization header is provided', () => {
        const request = { headers: {} };
        const response = {};
        const next = jest.fn((err) => { });
        (0, enforce_auth_1.default)(request, response, next);
        expect(next.mock.calls.length).toBe(1);
        expect(next.mock.calls[0][0]).toEqual(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'missing authorization header'));
    });
    test('calls next with a 401 error when no space between Bearer and token', () => {
        const request = { headers: {
                authorization: 'Bearer123'
            } };
        const response = {};
        const next = jest.fn((err) => { });
        (0, enforce_auth_1.default)(request, response, next);
        expect(next.mock.calls.length).toBe(1);
        expect(next.mock.calls[0][0]).toEqual(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'bad authorization header'));
    });
    test('calls next with a 401 error when Bearer keyword is misspelled', () => {
        const request = { headers: {
                authorization: 'Beaerer 123'
            } };
        const response = {};
        const next = jest.fn((err) => { });
        (0, enforce_auth_1.default)(request, response, next);
        expect(next.mock.calls.length).toBe(1);
        expect(next.mock.calls[0][0]).toEqual(new app_error_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'bad authorization header'));
    });
    test('success when all is valid', () => {
        const jwt = (0, jsonwebtoken_1.sign)({}, config_1.default.get('app.jwtSecret'));
        const request = { headers: {
                authorization: `Bearer ${jwt}`
            } };
        const response = {};
        const next = jest.fn((err) => { });
        (0, enforce_auth_1.default)(request, response, next);
        expect(next.mock.calls.length).toBe(1);
        expect(next.mock.calls[0][0]).toBeUndefined;
    });
});
