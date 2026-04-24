import { db } from "../config/db";
import { addOnboardingEvent } from "../queues/onboardingQueue";

export const getCompletedSteps = async (userId: string): Promise<string[]> => {
  const result = await db.query(
    "SELECT DISTINCT step FROM onboarding_events WHERE user_id = $1 ORDER BY step ASC",
    [userId]
  );
  return result.rows.map((row: { step: string }) => row.step);
};

export const trackOnboardingStep = async (
  userId: string,
  step: string,
  metadata: Record<string, unknown> = {}
) => {
  await addOnboardingEvent(userId, step, metadata);
};

