"use client";

import React, { useMemo } from "react";
import { ServerData } from "../types";

type Props = {
  servers: ServerData[];
};

const MetricsDashboard: React.FC<Props> = ({ servers }) => {
  // Calculate metrics
  const metrics = useMemo(() => {
    const totalServers = servers.length;

    const avgLatency =
      totalServers > 0
        ? (
            servers.reduce((sum, s) => sum + s.latency, 0) / totalServers
          ).toFixed(2)
        : "N/A";

    const providerCounts: Record<string, number> = {};
    servers.forEach((s) => {
      providerCounts[s.provider] = (providerCounts[s.provider] || 0) + 1;
    });

    return { totalServers, avgLatency, providerCounts };
  }, [servers]);

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur-lg text-gray-800 dark:text-gray-200 p-4 rounded-xl shadow-lg w-72 md:w-80 lg:w-96 z-50">
      <h2 className="text-base md:text-lg font-bold mb-3 border-b border-gray-300 dark:border-gray-600 pb-1">
        System Metrics
      </h2>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Total Servers:</span>{" "}
          {metrics.totalServers}
        </p>
        <p>
          <span className="font-semibold">Average Latency:</span>{" "}
          {metrics.avgLatency} ms
        </p>

        <div>
          <p className="font-semibold mb-1">Providers:</p>
          <ul className="ml-4 list-disc space-y-1">
            {Object.entries(metrics.providerCounts).map(([provider, count]) => (
              <li key={provider}>
                <span className="capitalize">{provider}</span>: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;
