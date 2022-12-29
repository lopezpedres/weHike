import {
  createContext,
  Dispatch,
  useContext,
  useReducer,
  useState,
} from "react";
import ModalComponent from "../../components/ImageModal/ImageModal";
import { InterfaceImageModal } from "./typesModalProvider";

interface Props {
  children: React.ReactNode;
}
interface State {
  url: string;
  title: string;
  description: string;
}
interface Action {
  type: "SET-URL" | "SET-TITLE" | "SET-DESCRIPTION" | "HIDDE-MODAL";
  payload?: string;
}
const ImageModalreducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET-URL":
      if (action.payload) return { ...state, url: action.payload };
    case "HIDDE-MODAL":
      return { ...state, url: "" };
    default:
      return state;
  }
};
interface InterfaceValue {
  showModal: (url: string) => void;
  hideModal: () => void;
}
const defaultState = { url: "", title: "", description: "" };
const ModalContextState = createContext({} as State);
const ModalContextDispatch = createContext({} as InterfaceValue);

const useModal = () => {
  return useContext(ModalContextDispatch);
};
const ImageModalProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(ImageModalreducer, defaultState);

  const showModal = (url: string) => {
    dispatch({ type: "SET-URL", payload: url });
  };
  const hideModal = () => {
    dispatch({ type: "HIDDE-MODAL" });
  };
  const value = {
    showModal,
    hideModal,
  };
  return (
    <ModalContextDispatch.Provider value={value}>
      <ModalContextState.Provider value={state}>
        <>
          {state.url !== "" && (
            <ModalComponent hideModal={hideModal} url={state.url} />
          )}
          {children}
        </>
      </ModalContextState.Provider>
    </ModalContextDispatch.Provider>
  );
};
export { useModal };
export default ImageModalProvider;
