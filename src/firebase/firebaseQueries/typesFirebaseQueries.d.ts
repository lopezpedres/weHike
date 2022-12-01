import { FieldValue } from "firebase/firestore";
//Add new user
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
export interface InterfaceUpdateTrailArg {
  trail_id: string;
  trail_name?: string;
  tags?: string[];
}
