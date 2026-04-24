import Bull from "bull";
import { db } from "../config/db";

interface OnboardingJob {
  userId: string;
  step: string;
  metadata: Record<string, unknown>;
}

const onboardingQueue = new Bull<OnboardingJob>("onboarding", process.env.REDIS_URL as string);

onboardingQueue.process(async (job) => {
  const { userId, step, metadata } = job.data;
  await db.query("INSERT INTO onboarding_events (user_id, step, metadata) VALUES ($1, $2, $3)", [
    userId,
    step,
    metadata || {}
  ]);
});

onboardingQueue.on("failed", (job, err) => {
  console.error(`Onboarding queue failed for job ${job?.id ?? "unknown"}:`, err);
});

export const addOnboardingEvent = async (
  userId: string,
  step: string,
  metadata: Record<string, unknown> = {}
) => {
  await onboardingQueue.add(
    { userId, step, metadata },
    { attempts: 3, backoff: 2000 }
  );
};

