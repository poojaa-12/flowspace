import { Router } from "express";
import * as pageController from "../controllers/pageController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.use(requireAuth);
router.get("/", pageController.getPages);
router.post("/", pageController.createPage);
router.patch("/:id", pageController.updatePage);
router.delete("/:id", pageController.deletePage);

export default router;

