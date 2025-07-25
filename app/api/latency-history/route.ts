import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { url } = request;
  const { searchParams } = new URL(url);
  const range = searchParams.get("range") || "1h";
  const server = searchParams.get("server") || "default-server";

  // Determine number of data points and interval based on range
  let points: number;
  let intervalMs: number;

  switch (range) {
    case "24h":
      points = 24;
      intervalMs = 60 * 60 * 1000; // 1 hour intervals
      break;
    case "7d":
      points = 7;
      intervalMs = 24 * 60 * 60 * 1000; // 1 day intervals
      break;
    case "30d":
      points = 30;
      intervalMs = 24 * 60 * 60 * 1000; // 1 day intervals
      break;
    case "1h":
    default:
      points = 60;
      intervalMs = 60 * 1000; // 1 minute intervals
      break;
  }

  // Generate mock latency data points for this specific server
  const now = Date.now();
  const data = Array.from({ length: points }, (_, i) => ({
    server,
    timestamp: now - i * intervalMs,
    latency: Math.floor(Math.random() * 100) + 10, // latency between 10-110ms
  })).reverse();

  return NextResponse.json(data);
}
