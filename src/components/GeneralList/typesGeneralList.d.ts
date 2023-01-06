import { GeoPoint } from "firebase/firestore";

export interface InterfacePropertiesFeature {
  id: string;
  name: string;
  trail_center: GeoPoint;
  sac_scale: string;
  elevation_gain: number;
  max_elevation: number;
  distance: number;
}
