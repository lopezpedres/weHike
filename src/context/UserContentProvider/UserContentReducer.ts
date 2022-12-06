import { stat } from "fs";
import { userContentDispatch } from "./UserContentProvider";
import type { State, Action } from "./UserContentTypes";

const ModuleReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET-USER-CURRENT-LOCATION":
      return { ...state, userCurrentLocation: action.payload };
    case "SET-SELECTED-TRAIL-NAME":
      return {
        ...state,
        selectedtrailDetails: {
          ...state.selectedtrailDetails,
          trailName: action.payload,
        },
      };
    case "SET-SELECTED-TRAIL-CENTER":
      return {
        ...state,
        selectedtrailDetails: {
          ...state.selectedtrailDetails,
          trailCenter: action.payload,
        },
      };
    default:
      return state;
  }
};

export default ModuleReducer;
