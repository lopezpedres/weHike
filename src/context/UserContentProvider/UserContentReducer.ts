import { userContentDispatch } from "./UserContentProvider";
import type { State, Action } from "./UserContentTypes";

const ModuleReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET-USER-DATA":
      return action.payload;
    case "CHANGE-PASSWORD":
      return { ...state, user: { ...state.user, password: action.payload } };
    default:
      return state;
  }
};

export default ModuleReducer;
