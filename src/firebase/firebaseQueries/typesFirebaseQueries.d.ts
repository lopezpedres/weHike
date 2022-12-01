import { FieldValue, GeoPoint } from "firebase/firestore";
//Add new trail
export default interface InterfaceNewTrailArg {
  trail_id: string;
  trail_name: string;
  tags?: string[];
}
export interface InterfaceNewUserTrail {
  [key: string]: {
    trail_name: string;
    tags?: string[];
    createdAt: FieldValue;
    updatedAt: FieldValue;
  };
}
//Update trails
//?This interface and InterfaceNewTrailArg are the same, should I have one for both?
export interface InterfaceUpdateTrailArg {
  trail_id: string;
  trail_name?: string;
  tags?: string[];
}

//Create new Custom Trails

export interface InterfaceNewCustomTrailArgs {
  trail_name: string;
  trail_start: GeoPoint;
  trail_end: GeoPoint;
}

export interface InterfaceNewCustomTrail {
  [key: string]: {
    trail_name: string;
    trail_start: GeoPoint;
    trail_end: GeoPoint;
    createdAt: FieldValue;
    updatedAt: FieldValue;
  };
}
