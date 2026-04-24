"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimit = void 0;
const windowMs = 60000;
const maxRequests = 100;
const requestLog = new Map();
const rateLimit = (req, res, next) => {
    const key = req.ip || "unknown";
    const now = Date.now();
    const entry = requestLog.get(key);
    if (!entry || now - entry.start > windowMs) {
        requestLog.set(key, { count: 1, start: now });
        next();
        return;
    }
    if (entry.count >= maxRequests) {
        res.status(429).json({ error: "Too many requests" });
        return;
    }
    entry.count += 1;
    next();
};
exports.rateLimit = rateLimit;
