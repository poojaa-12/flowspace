import { Router } from "express";
import * as onboardingController from "../controllers/onboardingController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);
router.post("/event", onboardingController.postOnboardingEvent);
router.get("/steps", onboardingController.getOnboardingSteps);

export default router;

