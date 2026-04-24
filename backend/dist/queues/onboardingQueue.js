"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOnboardingEvent = void 0;
const bull_1 = __importDefault(require("bull"));
const db_1 = require("../config/db");
const onboardingQueue = new bull_1.default("onboarding", process.env.REDIS_URL);
onboardingQueue.process(async (job) => {
    const { userId, step, metadata } = job.data;
    await db_1.db.query("INSERT INTO onboarding_events (user_id, step, metadata) VALUES ($1, $2, $3)", [
        userId,
        step,
        metadata || {}
    ]);
});
onboardingQueue.on("failed", (job, err) => {
    console.error(`Onboarding queue failed for job ${job?.id ?? "unknown"}:`, err);
});
const addOnboardingEvent = async (userId, step, metadata = {}) => {
    await onboardingQueue.add({ userId, step, metadata }, { attempts: 3, backoff: 2000 });
};
exports.addOnboardingEvent = addOnboardingEvent;
