import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import authRoutes from "./routes/authRoutes";
import pageRoutes from "./routes/pageRoutes";
import onboardingRoutes from "./routes/onboardingRoutes";
import healthRoutes from "./routes/healthRoutes";
import { rateLimit } from "./middleware/rateLimit";
import { errorHandler } from "./middleware/errorHandler";
import { setupCollabWebSocketServer } from "./wsServer";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());
app.use(rateLimit);

app.use("/auth", authRoutes);
app.use("/pages", pageRoutes);
app.use("/onboarding", onboardingRoutes);
app.use("/health", healthRoutes);

app.use(errorHandler);

const port = Number(process.env.PORT || 8080);
const server = createServer(app);
setupCollabWebSocketServer(server);

server.listen(port, () => {
  console.log(`FlowSpace backend running on port ${port}`);
});

