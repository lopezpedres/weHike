import { Point, Position } from "geojson";

type TActionOptions =
  | "CHANGE-EMAIL"
  | "CHANGE-PASSWORD"
  | "SET-USER-CURRENT-LOCATION"
  | "SET-SELECTED-TRAIL-NAME"
  | "SET-SELECTED-TRAIL-CENTER"
  | "SET-MY-TRAILS"
  | "SET-USER-META";

export type State = {
  userCurrentLocation?: GeolocationPosition;
  selectedtrailDetails: SelectedtrailDetails;
  userTrails: Trail | null;
  userMeta: userMeta;
};

interface Action {
  type: TActionOptions;
  payload: Position | string | userMeta | DocumentData | undefined; //Need to know exactly the type of input I'm going to be accepting here
}

export interface SelectedtrailDetails {
  trailName: string;
  trailCenter?: Position;
  elevationGain?: number;
  distance?: number;
  elevationMax?: number;
}

export interface Trail {
  [key: string]: TrailAtt;
}
export interface TrailAtt {
  notes_id: string;
  images_id: string;
  custom_id?: string | null;
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
