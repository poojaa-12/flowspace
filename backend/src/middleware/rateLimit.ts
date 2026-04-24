import { NextFunction, Request, Response } from "express";

const windowMs = 60_000;
const maxRequests = 100;
const requestLog = new Map<string, { count: number; start: number }>();

export const rateLimit = (req: Request, res: Response, next: NextFunction): void => {
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

