import { FieldValue, GeoPoint } from "firebase/firestore";
import { Position } from "geojson";
//? Should I start my randomId's with a the prefix of it;s object type?
//?For example imageId: 21-32432-23432-234 (All image object will start with 21) and so on...
//Add new trail
export default interface InterfaceNewTrailArg {
  trail_id: string;
  trail_name: string;
  custom_id?: string;
  tags?: InterfaceTags;
  trail_center?: GeoPoint;
  sac_scale?;
  elevation_gain?;
  max_elevation?;
  distance?;
}
interface InterfaceTags {
  fav?: boolean;
  custom?: boolean;
  planning?: boolean;
  done?: boolean;
}
export interface InterfaceNewUserTrail {
  [key: string]: {
    trail_id: string;
    trail_name: string;
    tags?: InterfaceTags;
    trail_center?: GeoPoint;
    sac_scale: string;
    elevation_gain: number;
    max_elevation: number;
    distance: number;
    images_id: string;
    custom_id?: string | null;
    createdAt: FieldValue;
    updatedAt: FieldValue;
    notes_id: string;
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
    trail_id: string;
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
  image_point: GeoPoint;
  image_url: string;
  trail_images_id: string;
}
export interface InterfaceImagesSingleTrail {
  [key: string]: {
    image_id: string;
    image_name: string;
    image_description: string;
    image_point: GeoPoint;
    image_url: string;
    createdAt: FieldValue;
    updatedAt: FieldValue;
  };
}

export interface InterfaceNewNoteToTrailArgs {
  note_content: string;
  note_title: string;
  note_point: GeoPoint;
  trail_notes_id: string;
}

export interface InterfaceNotesSingleTrail {
  [key: string]: {
    createdAt: FieldValue;
    updatedAt: FieldValue;
    note_id: string;
    note_content: string;
    note_title: string;
    note_point: GeoPoint;
    trail_notes_id: string;
  };
}
