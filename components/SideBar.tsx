"use client";

import React, { memo } from "react";

type SidebarProps = {
  selectedProvider: string;
  setSelectedProvider: (provider: string) => void;
  selectedLatency: string;
  setSelectedLatency: (latency: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  selectedProvider,
  setSelectedProvider,
  selectedLatency,
  setSelectedLatency,
}) => (
  <aside className="w-full md:w-64 bg-white dark:bg-gray-900 bg-opacity-90 backdrop-blur-lg rounded-xl p-4 shadow-lg text-gray-800 dark:text-gray-200 space-y-4">
    <h2 className="text-base md:text-lg font-bold border-b border-gray-300 dark:border-gray-600 pb-2">
      Filters
    </h2>

    <div className="space-y-2">
      <label htmlFor="provider" className="block text-sm font-semibold">
        Cloud Provider
      </label>
      <select
        id="provider"
        value={selectedProvider}
        onChange={(e) => setSelectedProvider(e.target.value)}
        className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        <option value="AWS">AWS</option>
        <option value="GCP">GCP</option>
        <option value="Azure">Azure</option>
      </select>
    </div>

    <div className="space-y-2">
      <label htmlFor="latency" className="block text-sm font-semibold">
        Latency Range
      </label>
      <select
        id="latency"
        value={selectedLatency}
        onChange={(e) => setSelectedLatency(e.target.value)}
        className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        <option value="low">Less than 30ms</option>
        <option value="medium">30ms - 60ms</option>
        <option value="high">Above 60ms</option>
      </select>
    </div>
  </aside>
);

export default memo(Sidebar);
