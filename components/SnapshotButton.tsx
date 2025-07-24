"use client";

import React from "react";

export default function SnapshotButton({ renderer }: { renderer: unknown }) {
  const handleDownload = () => {
    if (!renderer) {
      alert("Renderer not found!");
      return;
    }

    const image = renderer.domElement.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = `globe_snapshot_${new Date().toISOString()}.png`;
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded shadow"
    >
      📸 Download Snapshot
    </button>
  );
}
