export type ServerData = {
  lat: number;
  lng: number;
  exchange: string;
  provider: string;
  latency: number;
  destinationLat?: number;
  destinationLng?: number;
  history?: { timestamp: string; latency: number }[];
};

// types.ts
export type CloudRegion = {
  provider: "AWS" | "GCP" | "Azure";
  regionCode: string;
  lat: number;
  lng: number;
  serverCount: number;
};
