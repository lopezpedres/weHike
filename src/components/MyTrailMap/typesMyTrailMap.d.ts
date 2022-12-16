import { GeoPoint } from "firebase/firestore";

export interface InterfaceSelectedTrailDetails {
  TrailLat: number;
  TrailLng: number;
  images_id: string;
  notes_id: string;
  trail_id: string;
  custom_id: string;
}

export interface ImagesTrail {
  [key: string]: imageTrail;
}
export interface imageTrail {
  updatedAt: UpdatedAtOrCreatedAt;
  image_description: string;
  image_name: string;
  image_point: GeoPoint;
  image_url: string;
  image_id: string;
  createdAt: UpdatedAtOrCreatedAt;
}
export interface UpdatedAtOrCreatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface InterfaceCustomTrail {
  [key: string]: CustomTrail;
}
export interface CustomTrail {
  trail_end: GeoPoint;
  createdAt: UpdatedAtOrCreatedAt;
  updatedAt: UpdatedAtOrCreatedAt;
  trail_name: string;
  trail_start: GeoPoint;
  trail_max_altitude: number;
  trail_id: string;
  trail_center: GeoPoint;
  trail_geometry?: null;
}
