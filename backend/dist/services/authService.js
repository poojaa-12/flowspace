"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
const SALT_ROUNDS = 10;
const signup = async (email, password, displayName) => {
    const passwordHash = await bcryptjs_1.default.hash(password, SALT_ROUNDS);
    const result = await db_1.db.query("INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING id, email, display_name", [email, passwordHash, displayName ?? null]);
    const user = result.rows[0];
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
    return { token, user: { id: user.id, email: user.email, displayName: user.display_name } };
};
exports.signup = signup;
const login = async (email, password) => {
    const result = await db_1.db.query("SELECT id, email, password_hash, display_name FROM users WHERE email = $1", [email]);
    const user = result.rows[0];
    if (!user)
        throw new Error("Invalid credentials");
    const valid = await bcryptjs_1.default.compare(password, user.password_hash);
    if (!valid)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
    return { token, user: { id: user.id, email: user.email, displayName: user.display_name } };
};
exports.login = login;
