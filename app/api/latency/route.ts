import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      lat: 24.7749,
      lng: -112.4194,
      exchange: "Binance",
      provider: "AWS",
      latency: 20,
      destinationLat: 12.3521,
      destinationLng: 121.8198,
      history: [
        { timestamp: "10:00", latency: 22 },
        { timestamp: "10:01", latency: 20 },
        { timestamp: "10:02", latency: 19 },
        { timestamp: "10:03", latency: 21 },
      ],
    },
    {
      lat: 25.6895,
      lng: 134.6917,
      exchange: "Bybit",
      provider: "GCP",
      latency: 18,
      destinationLat: 40.7749,
      destinationLng: 72.4194,
      history: [
        { timestamp: "10:00", latency: 17 },
        { timestamp: "10:01", latency: 18 },
        { timestamp: "10:02", latency: 19 },
        { timestamp: "10:03", latency: 18 },
      ],
    },
    {
      lat: 18.6895,
      lng: 72.6917,
      exchange: "Bybit",
      provider: "Azure",
      latency: 18,
      destinationLat: 52.7749,
      destinationLng: 13.4194,
      history: [
        { timestamp: "06:00", latency: 17 },
        { timestamp: "07:01", latency: 18 },
        { timestamp: "08:02", latency: 19 },
        { timestamp: "09:03", latency: 18 },
      ],
    },
    {
      lat: 55.6895,
      lng: 37.6917,
      exchange: "Binance",
      provider: "Azure",
      latency: 18,
      destinationLat: 52.7749,
      destinationLng: 13.4194,
      history: [
        { timestamp: "06:00", latency: 17 },
        { timestamp: "07:01", latency: 18 },
        { timestamp: "08:02", latency: 19 },
        { timestamp: "09:03", latency: 18 },
      ],
    },
    {
      lat: 85.6895,
      lng: 37.6917,
      exchange: "Coinbase",
      provider: "AWS",
      latency: 18,
      destinationLat: 82.7749,
      destinationLng: 23.4194,
      history: [
        { timestamp: "01:00", latency: 17 },
        { timestamp: "02:01", latency: 18 },
        { timestamp: "03:02", latency: 19 },
        { timestamp: "04:03", latency: 18 },
      ],
    },
  ]);
}
