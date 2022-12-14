import { Position } from "geojson";

export interface InterfacePropertiesFeature {
  id: string;
  name: string;
  trail_center: Position;
  sac_scale: string;
  elevation_gain: number;
  max_elevation: number;
  distance: number;
}
