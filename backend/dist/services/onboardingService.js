"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackOnboardingStep = exports.getCompletedSteps = void 0;
const db_1 = require("../config/db");
const onboardingQueue_1 = require("../queues/onboardingQueue");
const getCompletedSteps = async (userId) => {
    const result = await db_1.db.query("SELECT DISTINCT step FROM onboarding_events WHERE user_id = $1 ORDER BY step ASC", [userId]);
    return result.rows.map((row) => row.step);
};
exports.getCompletedSteps = getCompletedSteps;
const trackOnboardingStep = async (userId, step, metadata = {}) => {
    await (0, onboardingQueue_1.addOnboardingEvent)(userId, step, metadata);
};
exports.trackOnboardingStep = trackOnboardingStep;
