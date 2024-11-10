import * as ws from "ws";

const port = 8080;

const wss = new ws.WebSocketServer({ port });

wss.on("connection", (socket) => {
  console.log("New client connected");

  // Send welcome message
  socket.send(JSON.stringify({ type: "message", data: "Connected to WebSocket server" }));

  //   Create timer for heartbeat
  const heartbeatTimer = setInterval(() => {
    socket.send(
      JSON.stringify({
        type: "heartbeat",
        data: { message: "Heartbeat from server", time: new Date().toISOString() },
      })
    );
  }, 5000);

  // Handle incoming messages
  socket.on("message", (message) => {
    // deserialize message from buffer

    const deserialiesdMessage = message.toString();

    if (typeof deserialiesdMessage !== "string") {
      console.error("Received non-string message");
      console.error(message);
      return;
    }
    try {
      const parsedMessage = JSON.parse(deserialiesdMessage);
      console.log("Received:", parsedMessage);

      // Echo the message back
      socket.send(
        JSON.stringify({
          type: "message",
          data: `Server received: ${parsedMessage.data}`,
        })
      );
    } catch (e) {
      console.error("Error parsing message:", e);
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
    clearInterval(heartbeatTimer);
  });
});
