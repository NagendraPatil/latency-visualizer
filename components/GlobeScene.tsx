"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import Globe from "three-globe";
import { ServerData } from "../types";

type Props = {
  servers: ServerData[];
  setSelectedServer: (server: ServerData) => void;
  globeRef: React.MutableRefObject<unknown>;
  searchQuery: string | null;
  showRealTime: boolean;
  showHistorical: boolean;
};

const latLngToVector3 = (lat: number, lng: number, radius: number = 100) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
};

const GlobeScene: React.FC<Props> = ({
  servers,
  setSelectedServer,
  globeRef,
  searchQuery,
  showRealTime,
  showHistorical,
}) => {
  const localGlobeGroupRef = useRef<THREE.Group>(null);
  const globeInstance = useRef<unknown>(null);
  const { camera, gl } = useThree();
  const [processedQuery, setProcessedQuery] = useState<string | null>(null);

  gl.toneMappingExposure = 1.5;

  const handleClick = useCallback(
    (event: MouseEvent) => {
      const mouse = new THREE.Vector2();
      const rect = gl.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      if (!localGlobeGroupRef.current) return;
      const intersects = raycaster.intersectObjects(
        localGlobeGroupRef.current.children,
        true
      );

      if (intersects.length > 0) {
        const clickedObj = intersects[0].object as unknown as {
          __data?: ServerData;
          userData?: ServerData;
        };
        const clickedPoint = clickedObj.__data || clickedObj.userData;
        if (clickedPoint) setSelectedServer(clickedPoint as ServerData);
      }
    },
    [camera, gl.domElement, setSelectedServer]
  );

  useEffect(() => {
    if (!localGlobeGroupRef.current) return;

    if (!globeInstance.current) {
      globeInstance.current = new Globe()
        .globeImageUrl("/textures/earth-dark.jpg")
        .bumpImageUrl("/textures/earth-topology.jpg")
        .pointLat("lat")
        .pointLng("lng")
        .pointAltitude(0.01)
        .pointRadius(0.2)
        .pointColor((d) => {
          switch ((d as ServerData).provider) {
            case "AWS":
              return "orange";
            case "GCP":
              return "blue";
            case "Azure":
              return "green";
            default:
              return "white";
          }
        })
        .labelLat("lat")
        .labelLng("lng")
        .labelText(
          (d) => `${(d as ServerData).exchange}\n${(d as ServerData).provider}`
        )
        .labelSize(1.2)
        .labelDotRadius(0.3)
        .labelColor(() => "white")
        .labelResolution(2)
        .arcStartLat("lat")
        .arcStartLng("lng")
        .arcEndLat("destinationLat")
        .arcEndLng("destinationLng")
        .arcColor((d) => {
          const s = d as ServerData;
          if (s.latency < 30) return "green";
          if (s.latency < 60) return "yellow";
          return "red";
        })
        .arcAltitude(0.4)
        .arcStroke(0.2)
        .arcDashLength(0.4)
        .arcDashGap(0.2)
        .arcDashAnimateTime(1500);

      globeRef.current = globeInstance.current;
      localGlobeGroupRef.current.add(globeInstance.current);

      gl.domElement.addEventListener("click", handleClick);
    }
  }, [gl.domElement, handleClick, globeRef]);

  // 🔄 Update globe layers when toggles change
  useEffect(() => {
    if (!globeInstance.current) return;

    globeInstance.current.pointsData(showRealTime ? servers : []);
    globeInstance.current.arcsData(
      showHistorical
        ? servers.filter((s) => s.destinationLat && s.destinationLng)
        : []
    );
    globeInstance.current.labelsData(servers);
  }, [servers, showRealTime, showHistorical]);

  // 🔍 Search functionality camera move
  useEffect(() => {
    if (!searchQuery || searchQuery === processedQuery) return;

    const found = servers.find((s) =>
      s.exchange.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (found) {
      const surfacePoint = latLngToVector3(found.lat, found.lng);
      const direction = surfacePoint.clone().normalize();
      const target = surfacePoint.clone().add(direction.multiplyScalar(150));

      const duration = 1000;
      const startPosition = camera.position.clone();
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / duration, 1);

        camera.position.lerpVectors(startPosition, target, t);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        if (t < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    } else {
      alert("Exchange not found.");
    }

    setProcessedQuery(searchQuery);
  }, [searchQuery, processedQuery, servers, camera]);

  return <group ref={localGlobeGroupRef} />;
};

export default GlobeScene;
