const WebSocketServer = require("ws").Server;

module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081;
  const wsServer = new WebSocketServer({ port: WEBSOCKET_PORT });

  // * TODO: Write the WebSocket API for receiving `update`s,
  //         using `stepService` for data persistence.
  // * TODO: Make sure to return an instance of a WebSocketServer,
  //         which contains `close()` method.

  wsServer.on("connection", (ws) => {
    ws.on("message", (message) => {
      const data = JSON.parse(message);
      const valid =
        typeof data.update_id === "string" &&
        typeof data.username === "string" &&
        typeof data.ts === "number" &&
        typeof data.newSteps === "number";
      if (valid) {
        stepService.add(data.username, data.ts, data.newSteps);
      }
    });
    ws.on("close", () => {
      console.log("Disconnected");
    });
  });

  return wsServer;
};
