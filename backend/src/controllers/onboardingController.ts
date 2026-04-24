import { Request, Response } from "express";
import * as onboardingService from "../services/onboardingService";

export const postOnboardingEvent = async (req: Request, res: Response): Promise<void> => {
  const { step, metadata = {} } = req.body;
  await onboardingService.trackOnboardingStep(req.user!.id, step, metadata);
  res.json({ success: true });
};

export const getOnboardingSteps = async (req: Request, res: Response): Promise<void> => {
  const completedSteps = await onboardingService.getCompletedSteps(req.user!.id);
  res.json({ completedSteps });
};

