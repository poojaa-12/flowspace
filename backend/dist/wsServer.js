"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCollabWebSocketServer = void 0;
const ws_1 = __importDefault(require("ws"));
const utils_1 = require("y-websocket/bin/utils");
const setupCollabWebSocketServer = (httpServer) => {
    const wss = new ws_1.default.Server({ server: httpServer, path: "/collab" });
    let clients = 0;
    wss.on("connection", (conn, req) => {
        clients += 1;
        console.log(`WebSocket connected clients: ${clients}`);
        (0, utils_1.setupWSConnection)(conn, req, { gc: true });
        conn.on("close", () => {
            clients -= 1;
            console.log(`WebSocket connected clients: ${clients}`);
        });
    });
    return wss;
};
exports.setupCollabWebSocketServer = setupCollabWebSocketServer;
