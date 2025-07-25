import { Server } from "socket.io";

const io = new Server(4000, {
  cors: {
    origin: "*",
  },
});

console.log("Mock WebSocket server running on ws://localhost:4000");

setInterval(() => {
  const latency = Math.floor(Math.random() * 100);
  const exchangeList = ["Binance", "Bybit", "Coinbase"];
  const randomExchange =
    exchangeList[Math.floor(Math.random() * exchangeList.length)];

  io.emit("latency-update", {
    exchange: randomExchange,
    latency,
    historyEntry: { timestamp: new Date().toLocaleTimeString(), latency },
  });
}, 5000);
