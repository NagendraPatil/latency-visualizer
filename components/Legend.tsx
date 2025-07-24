"use client";

import React, { memo } from "react";
import LatencyLegend from "./LatencyLegend";

const Legend: React.FC = () => (
  <aside className="z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-40 md:w-64 lg:w-50 backdrop-blur-md flex flex-col p-4 ml-auto">
    <h2 className="text-base md:text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200 border-b border-gray-300 dark:border-gray-600 pb-1">
      Providers
    </h2>
    <ul className="space-y-2">
      <li className="flex items-center">
        <span
          className="inline-block w-4 h-4 rounded-full bg-orange-500 mr-3"
          aria-label="AWS provider color"
        />
        <span className="text-gray-700 dark:text-gray-300">AWS</span>
      </li>
      <li className="flex items-center">
        <span
          className="inline-block w-4 h-4 rounded-full bg-blue-500 mr-3"
          aria-label="GCP provider color"
        />
        <span className="text-gray-700 dark:text-gray-300">GCP</span>
      </li>
      <li className="flex items-center">
        <span
          className="inline-block w-4 h-4 rounded-full bg-green-500 mr-3"
          aria-label="Azure provider color"
        />
        <span className="text-gray-700 dark:text-gray-300">Azure</span>
      </li>
    </ul>

    <div className="mt-4">
      <LatencyLegend />
    </div>
  </aside>
);

export default memo(Legend);
