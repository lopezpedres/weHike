import { Point, Position } from "geojson";

type TActionOptions =
  | "CHANGE-EMAIL"
  | "CHANGE-PASSWORD"
  | "SET-USER-DATA"
  | "SET-USER-CURRENT-LOCATION"
  | "SET-SELECTED-TRAIL-NAME"
  | "SET-SELECTED-TRAIL-CENTER";

export type State = {
  userCurrentLocation?: GeolocationPosition;
  selectedtrailDetails: {
    trailName: string;
    trailCenter?: Position;
    elevationGain?: number;
    distance?: number;
    elevationMax?: number;
  };
};

interface Action {
  type: TActionOptions;
  payload: any; //Need to know exactly the type of input I'm going to be accepting here
}
