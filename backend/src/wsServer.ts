import { Server as HttpServer } from "http";
import ws from "ws";
import { setupWSConnection } from "y-websocket/bin/utils";

export const setupCollabWebSocketServer = (httpServer: HttpServer) => {
  const wss = new ws.Server({ server: httpServer, path: "/collab" });
  let clients = 0;

  wss.on("connection", (conn, req) => {
    clients += 1;
    console.log(`WebSocket connected clients: ${clients}`);
    setupWSConnection(conn as never, req as never, { gc: true });

    conn.on("close", () => {
      clients -= 1;
      console.log(`WebSocket connected clients: ${clients}`);
    });
  });

  return wss;
};

