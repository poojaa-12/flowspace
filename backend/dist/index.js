"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const pageRoutes_1 = __importDefault(require("./routes/pageRoutes"));
const onboardingRoutes_1 = __importDefault(require("./routes/onboardingRoutes"));
const healthRoutes_1 = __importDefault(require("./routes/healthRoutes"));
const rateLimit_1 = require("./middleware/rateLimit");
const errorHandler_1 = require("./middleware/errorHandler");
const wsServer_1 = require("./wsServer");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.use(rateLimit_1.rateLimit);
app.use("/auth", authRoutes_1.default);
app.use("/pages", pageRoutes_1.default);
app.use("/onboarding", onboardingRoutes_1.default);
app.use("/health", healthRoutes_1.default);
app.use(errorHandler_1.errorHandler);
const port = Number(process.env.PORT || 8080);
const server = (0, http_1.createServer)(app);
(0, wsServer_1.setupCollabWebSocketServer)(server);
server.listen(port, () => {
    console.log(`FlowSpace backend running on port ${port}`);
});
