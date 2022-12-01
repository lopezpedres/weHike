import { FieldValue, GeoPoint } from "firebase/firestore";
//Add new trail
export default interface InterfaceNewTrailArg {
  trail_id: string;
  trail_name: string;
  custom_id?: string;
  tags?: InterfaceTags;
}
interface InterfaceTags {
  fav?: boolean;
  custom?: boolean;
  planning?: boolean;
  done?: boolean;
}
export interface InterfaceNewUserTrail {
  [key: string]: {
    trail_name: string;
    tags?: InterfaceTags;
    images_id: string;
    custom_id?: string | null;
    createdAt: FieldValue;
    updatedAt: FieldValue;
  };
}
//Update trails
//?This interface and InterfaceNewTrailArg are the same, should I have one for both?
export interface InterfaceUpdateTrailArg {
  trail_id: string;
  trail_name?: string;
  tags?: InterfaceTags;
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

//Add image to trails
export interface InterfaceNewImageToTrailArgs {
  image_name: string;
  image_description: string;
  trail_id: string;
  image_point: GeoPoint;
}
export interface InterfaceAllTrailsImages {
  //Key of User
  [key: string]: {
    //Key og
    [key: string]: InterfaceImagesInSingleTrail;
  };
}
export interface InterfaceImagesInSingleTrail {
  image_name: string;
  image_description: string;
  image_point: GeoPoint;
  image_url: string;
  createdAt: FieldValue;
  updatedAt: FieldValue;
}
