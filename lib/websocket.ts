import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/**
 * Connect to WebSocket server
 * @param url WebSocket server URL
 */
export const connectSocket = (url: string) => {
  if (!socket) {
    socket = io(url, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.on("connect", () => {
      console.log("WebSocket connected:", socket?.id);
    });

    socket.on("connect_error", (err) => {
      console.error("WebSocket connection error:", err);
    });

    socket.on("disconnect", (reason) => {
      console.log("WebSocket disconnected:", reason);
    });
  }
};

/**
 * Subscribe to latency updates
 * @param callback Function to handle incoming latency data
 */
export const subscribeToLatency = (callback: (data: unknown) => void) => {
  if (!socket) {
    console.warn("Socket not initialized. Call connectSocket first.");
    return;
  }
  socket.on("latencyUpdate", callback);
};

/**
 * Disconnect WebSocket
 */
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("WebSocket disconnected manually");
    socket = null;
  }
};
