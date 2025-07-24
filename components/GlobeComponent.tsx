"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GlobeScene from "./GlobeScene";
import { ServerData } from "../types";
import Sidebar from "./SideBar";
import MetricsDashboard from "./MetricsDashboard";

type Props = {
  servers: ServerData[];
  onServerClick: (serverKey: string) => void;
};

const GlobeComponent: React.FC<Props> = ({ servers, onServerClick }) => {
  const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedLatency, setSelectedLatency] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const [showRealTime, setShowRealTime] = useState(true);
  const [showHistorical, setShowHistorical] = useState(false);

  const orbitControlsRef = useRef<unknown>(null);
  const globeRef = useRef<unknown>(null);
  const [searchTarget, setSearchTarget] = useState<string>("");

  const filteredServers = useMemo(() => {
    return servers.filter((s) => {
      const providerMatch = selectedProvider
        ? s.provider === selectedProvider
        : true;
      const latencyMatch = selectedLatency
        ? selectedLatency === "low"
          ? s.latency < 30
          : selectedLatency === "medium"
            ? s.latency >= 30 && s.latency <= 60
            : s.latency > 60
        : true;
      return providerMatch && latencyMatch;
    });
  }, [servers, selectedProvider, selectedLatency]);

  useEffect(() => {
    if (selectedServer) {
      onServerClick(`${selectedServer.exchange}-${selectedServer.provider}`);
    }
  }, [onServerClick, selectedServer]);

  const handleCameraMove = (action: string) => {
    const controls = orbitControlsRef.current;
    const rotateSpeed = Math.PI / 24;
    const zoomFactor = 0.9;

    if (!controls) return;

    switch (action) {
      case "up":
        controls.setPolarAngle(controls.getPolarAngle() - rotateSpeed);
        break;
      case "down":
        controls.setPolarAngle(controls.getPolarAngle() + rotateSpeed);
        break;
      case "left":
        controls.setAzimuthalAngle(controls.getAzimuthalAngle() + rotateSpeed);
        break;
      case "right":
        controls.setAzimuthalAngle(controls.getAzimuthalAngle() - rotateSpeed);
        break;
      case "zoomIn":
        controls.dollyIn(zoomFactor);
        break;
      case "zoomOut":
        controls.dollyOut(zoomFactor);
        break;
    }

    controls.update();
  };

  const handleSearch = (searchedKey: string) => {
    setSearchTarget(searchedKey);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 z-50 flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-gray-900 bg-opacity-70 p-3 rounded">
        <input
          type="text"
          placeholder="Search exchange..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="p-2 rounded border w-full sm:w-auto"
        />
        <button
          onClick={() => handleSearch(searchInput)}
          className="bg-blue-500 text-white px-3 py-2 rounded w-full sm:w-auto"
        >
          Search
        </button>
      </div>

      {/* Toggle Switches */}
      <div className="absolute top-28 left-4 bg-gray-800 bg-opacity-80 p-3 rounded z-50 text-white w-52">
        <h4 className="font-bold mb-2">Visualization Layers</h4>
        <div className="flex flex-col gap-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showRealTime}
              onChange={() => setShowRealTime(!showRealTime)}
              className="mr-2"
            />
            Real-Time
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showHistorical}
              onChange={() => setShowHistorical(!showHistorical)}
              className="mr-2"
            />
            Historical
          </label>
        </div>
      </div>

      <Canvas camera={{ position: [0, 0, 400], fov: 45 }}>
        <ambientLight intensity={2} />
        <pointLight position={[100, 100, 100]} intensity={2} />
        <GlobeScene
          servers={filteredServers}
          setSelectedServer={setSelectedServer}
          globeRef={globeRef}
          searchQuery={searchTarget}
          showRealTime={showRealTime}
          showHistorical={showHistorical}
        />
        <hemisphereLight
          skyColor={0xffffff}
          groundColor={0x444444}
          intensity={1.2}
        />
        <OrbitControls ref={orbitControlsRef} enableZoom={true} />
      </Canvas>

      {/* Camera Controls */}
      <div className="absolute bottom-8 right-4 flex flex-col gap-2 bg-gray-800 bg-opacity-80 p-2 rounded z-50">
        <button
          onClick={() => handleCameraMove("up")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
        >
          ↑
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => handleCameraMove("left")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
          >
            ←
          </button>
          <button
            onClick={() => handleCameraMove("right")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
          >
            →
          </button>
        </div>
        <button
          onClick={() => handleCameraMove("down")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded"
        >
          ↓
        </button>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => handleCameraMove("zoomIn")}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded"
          >
            +
          </button>
          <button
            onClick={() => handleCameraMove("zoomOut")}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded"
          >
            -
          </button>
        </div>
      </div>

      {/* Sidebar Filters */}
      <div className="absolute bottom-8 left-4 z-50 w-64">
        <Sidebar
          selectedProvider={selectedProvider}
          setSelectedProvider={setSelectedProvider}
          selectedLatency={selectedLatency}
          setSelectedLatency={setSelectedLatency}
        />
      </div>

      {/* Selected Server Info */}
      {selectedServer && Object.keys(selectedServer).length > 2 && (
        <div className="absolute top-16 right-4 bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-xs z-50">
          <h3 className="text-lg font-bold mb-2">{selectedServer.exchange}</h3>
          <p>
            <strong>Provider:</strong> {selectedServer.provider}
          </p>
          <p>
            <strong>Location:</strong> {selectedServer.lat},{" "}
            {selectedServer.lng}
          </p>
          <p>
            <strong>Latency:</strong> {selectedServer.latency} ms
          </p>
        </div>
      )}

      <MetricsDashboard servers={servers} />
    </div>
  );
};

export default GlobeComponent;
