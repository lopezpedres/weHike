import React, { useMemo } from "react";
import { Marker } from "react-map-gl";
import { ImagesTrail, imageTrail } from "../MyTrailMap/typesMyTrailMap";
interface Props {
  trailImages: ImagesTrail;
  setShowPopup: React.Dispatch<React.SetStateAction<imageTrail | undefined>>;
}
const ImagesMarkers = ({ trailImages, setShowPopup }: Props) => {
  const onclickHandler = (value: imageTrail) => {
    setShowPopup(value);
  };
  const allMarkers = useMemo(() => {
    return (
      <>
        {Object.entries(trailImages).map(([key, value]) => {
          return (
            <Marker
              key={key}
              longitude={value.image_point.longitude}
              latitude={value.image_point.latitude}
              anchor="top"
              onClick={() => onclickHandler(value)}
            >
              <img
                alt=""
                className="rounded-full shadow-2xl border-2 border-white h-8 w-8 object-cover "
                src={value.image_url}
              />
            </Marker>
          );
        })}
      </>
    );
  }, [trailImages]);
  return allMarkers;
};

export default ImagesMarkers;
