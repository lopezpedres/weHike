export type State = {
  data?: Data;
};
interface Data {
  name: string;
  courseSlug: string;
  content?: ContentEntity[] | null;
}
interface ContentEntity {
  module: number;
  title: string;
  overview: string;
  objectives?: string[] | null;
}

//Action Types
export type Action = {
  type: string;
  payload: State;
};
const ModuleReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MODULE":
      return action.payload;
    default:
      return state;
  }
};

export default ModuleReducer;
