"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { io } from "socket.io-client";

import { disconnectSocket } from "../lib/websocket";
import Legend from "@/components/Legend";
import LatencyChart from "@/components/LatencyChart";
import { ServerData } from "@/types";
import LatencyLegend from "@/components/LatencyLegend";

const GlobeComponent = dynamic(() => import("../components/GlobeComponent"), {
  ssr: false,
});

export default function HomePage() {
  const [servers, setServers] = useState<ServerData[]>([]);
  const [selectedServer, setSelectedServer] = useState<string>("binance-aws");

  // Initial data fetch
  useEffect(() => {
    const fetchLatencyData = async () => {
      try {
        const res = await axios.get("/api/latency");
        const cleanedData: ServerData[] = res.data.map(
          (d: {
            provider: string;
            destinationLat: string;
            destinationLng: string;
          }) => ({
            ...d,
            provider: d.provider || "Unknown",
            destinationLat: d.destinationLat || null,
            destinationLng: d.destinationLng || null,
          })
        );
        setServers(cleanedData);
      } catch (error) {
        console.error("Failed to fetch latency data:", error);
      }
    };

    fetchLatencyData();
    return () => disconnectSocket();
  }, []);

  // Socket updates
  useEffect(() => {
    const socket = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:4000"
    );

    const handleLatencyUpdate = (
      updatedServer: ServerData & { historyEntry: unknown }
    ) => {
      setServers((prevServers) =>
        prevServers.map((server) =>
          server.exchange === updatedServer.exchange
            ? {
                ...server,
                latency: updatedServer.latency,
                history: [
                  ...(server.history || []),
                  updatedServer.historyEntry,
                ].slice(-10),
              }
            : server
        )
      );
    };

    socket.on("latency-update", handleLatencyUpdate);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 min-h-screen">
      <div className="w-full lg:w-2/3 xl:w-3/4">
        <div className="relative w-full h-[60vh] lg:h-screen rounded overflow-hidden">
          <GlobeComponent servers={servers} onServerClick={setSelectedServer} />
        </div>
      </div>
      <div className="flex flex-col relative w-full h-full lg:w-1/3 xl:w-1/4 items-end justify-items-end justify-end">
        <LatencyChart server={selectedServer} />
        <div className="w-full h-full mt-4 flex items-left justify-start">
          <LatencyLegend />
          <Legend />
        </div>
      </div>
    </div>
  );
}
