type TActionOptions =
  | "CHANGE-EMAIL"
  | "CHANGE-PASSWORD"
  | "SET-USER-DATA"
  | "SET-USER-CURRENT-LOCATION"
  | "SET-SELECTED-TRAIL";

export type State = {
  user: {
    password: string;
    email: string;
  };
  userCurrentLocation?: GeolocationPosition;
  selectedTrailName?: string;
};

interface Action {
  type: TActionOptions;
  payload: any; //Need to know exactly the type of input I'm going to be accepting here
}
