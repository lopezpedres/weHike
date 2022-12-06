import { Position } from "geojson";

export interface InterfacePropertiesFeature {
  id: string;
  name: string;
  geometry: Position;
  sac_scale?: string | null;
  elevation_gain?: number;
}
