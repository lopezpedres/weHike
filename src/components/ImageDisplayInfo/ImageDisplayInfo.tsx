import CloseIcon from "../CloseIcon/CloseIcon";
import { ImagesTrail, imageTrail } from "../MyTrailMap/typesMyTrailMap";

interface Props {
  setShowPopup: React.Dispatch<React.SetStateAction<imageTrail | undefined>>;
  showPopup: imageTrail;
}
const ImageDisplayInfo = ({ setShowPopup, showPopup }: Props) => {
  return (
    <section
      onClick={() => setShowPopup(undefined)}
      className="absolute shadow-md max-w-xs w-11/12 text-xl font-semibold  bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
    >
      {/* <h1>{showPopup.image_name}</h1> */}
      <img className=" rounded-t-xl" src={showPopup.image_url} />
      {/* <p>{showPopup.image_description}</p> */}
      <h1 className="p-2">{showPopup.image_name}</h1>
      <p className=" p-2 text-sm">{showPopup.image_description}</p>
    </section>
  );
};

export default ImageDisplayInfo;
