"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWTSecret = "$uper@1234.";
class JWTService {
    static generateTokenForUser(user) {
        const payload = {
            id: user.id,
            email: user.email
        };
        const token = jsonwebtoken_1.default.sign(payload, JWTSecret);
        return token;
    }
}
exports.default = JWTService;
