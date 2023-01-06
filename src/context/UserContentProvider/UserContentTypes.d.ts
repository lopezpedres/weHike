import { GeoPoint } from "firebase/firestore";
import { Point, Position } from "geojson";

type TActionOptions =
  | "CHANGE-EMAIL"
  | "CHANGE-PASSWORD"
  | "SET-USER-CURRENT-LOCATION"
  | "SET-SELECTED-TRAIL-NAME"
  | "SET-SELECTED-TRAIL-CENTER"
  | "SET-MY-TRAILS"
  | "SET-USER-META"
  | "SET-SELECTED-MY-TRAIL-NAME"
  | "SET-SELECTED-TRAIL-ID"
  | "SET-SELECTED-TRAIL-SAC-SCALE"
  | "SET-SELECTED-TRAIL-MAX-ELEVATION"
  | "SET-SELECTED-TRAIL-DISTANCE";

export type State = {
  userCurrentLocation?: GeolocationPosition;
  selectedtrailDetails: SelectedtrailDetails;
  userTrails: Trail | null;
  userMeta: userMeta;
  selectedMyTrailName?: string;
};

interface Action {
  type: TActionOptions;
  payload: GeoPoint | string | userMeta | DocumentData | undefined | number;
}

export interface SelectedtrailDetails {
  trailId: string;
  trailName: string;
  trailCenter: GeoPoint;
  elevationGain: number;
  distance: number;
  elevationMax: number;
  sac_scale: string;
}

export interface Trail {
  [key: string]: TrailAtt;
}
export interface TrailAtt {
  notes_id: string;
  images_id: string;
  custom_id?: string | null;
  distance: number;
  max_elevation: number;
  elevation_gain?: number;
  trail_center: GeoPoint;
  tags: Tags;
  createdAt: CreatedAtOrUpdatedAt;
  trail_name: string;
  trail_id: string;
  updatedAt: CreatedAtOrUpdatedAt;
}
export interface Tags {
  custom: ?boolean;
  planning: boolean;
  done?: boolean;
  fav?: boolean;
  [key: string]: boolean;
}
export interface CreatedAtOrUpdatedAt {
  seconds: number;
  nanoseconds: number;
}

export interface userMeta {
  updatedAt: CreatedAtOrUpdatedAt;
  createdAt: CreatedAtOrUpdatedAt;
  email: string;
  name: string;
  avatar_url: string;
}
