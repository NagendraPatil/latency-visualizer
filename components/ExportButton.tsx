"use client";

import { ServerData } from "../types";
import { saveAs } from "file-saver";

type Props = {
  data: ServerData[];
};

export default function ExportButton({ data }: Props) {
  const handleExportCSV = () => {
    const csvRows = [
      ["Exchange", "Provider", "Latency", "Lat", "Lng"].join(","),
      ...data.map((d) =>
        [d.exchange, d.provider, d.latency, d.lat, d.lng].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvRows], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "latency_report.csv");
  };

  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, "latency_report.json");
  };

  return (
    <div className="space-x-2">
      <button
        onClick={handleExportCSV}
        className="bg-green-600 text-white px-3 py-1 rounded"
      >
        Export CSV
      </button>
      <button
        onClick={handleExportJSON}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Export JSON
      </button>
    </div>
  );
}
