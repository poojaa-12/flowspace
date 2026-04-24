import { useEffect, useMemo, useState } from "react";
import client from "../api/client";

export enum OnboardingStep {
  SIGNUP = "signup",
  CREATE_FIRST_PAGE = "create_first_page",
  FIRST_EDIT = "first_edit",
  USED_SLASH_COMMAND = "used_slash_command",
  INVITED_COLLABORATOR = "invited_collaborator"
}

const ALL_STEPS = Object.values(OnboardingStep);

export const useOnboardingTracker = () => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data } = await client.get("/onboarding/steps");
      setCompletedSteps(data.completedSteps || []);
    };
    void load();
  }, []);

  const trackStep = async (step: OnboardingStep, metadata: Record<string, unknown> = {}) => {
    if (completedSteps.includes(step)) return;
    setCompletedSteps((prev) => [...new Set([...prev, step])]);
    await client.post("/onboarding/event", { step, metadata });
  };

  const completionRate = useMemo(() => {
    return Math.round((completedSteps.length / ALL_STEPS.length) * 100);
  }, [completedSteps]);

  return { completedSteps, trackStep, completionRate };
};

