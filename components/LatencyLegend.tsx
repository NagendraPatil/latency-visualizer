"use client";

import React, { memo } from "react";

const LatencyLegend = () => (
  <aside className=" bg-gray-900 bg-opacity-80 p-4 rounded-lg text-white text-sm shadow-lg backdrop-blur-md w-48 md:w-full">
    <h2 className="mb-3 font-semibold text-base border-b border-gray-600 pb-1">
      Latency info
    </h2>
    <ul className="space-y-2">
      <li className="flex items-center">
        <span
          className="w-3 h-3 bg-green-500 inline-block mr-3 rounded-full"
          aria-label="Low latency under 30ms"
        />
        <span>&lt; 30 ms</span>
      </li>
      <li className="flex items-center">
        <span
          className="w-3 h-3 bg-yellow-400 inline-block mr-3 rounded-full"
          aria-label="Medium latency 30-60ms"
        />
        <span>30 - 60 ms</span>
      </li>
      <li className="flex items-center">
        <span
          className="w-3 h-3 bg-red-500 inline-block mr-3 rounded-full"
          aria-label="High latency above 60ms"
        />
        <span>&gt; 60 ms</span>
      </li>
    </ul>
  </aside>
);

export default memo(LatencyLegend);
