import React, { useRef } from "react";
import type { MapRef } from "react-map-gl";
import getBoundingBoxPoints from "../utils/getBoundingBoxPoints";

interface PropsInterface {
  viewState: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  mapRef: React.MutableRefObject<MapRef | null>;
}
const BoundingBox = ({ viewState, mapRef }: PropsInterface) => {
  const bboxRef = useRef<HTMLDivElement | null>(null);
  const bBoxHanlder = () => getBoundingBoxPoints({ bboxRef, mapRef });

  return (
    <div onClick={() => bBoxHanlder()} ref={bboxRef} className="div-data">
      {"latitude " + viewState.latitude}
      <br />
      {"longitude " + viewState.longitude}
    </div>
  );
};

export default BoundingBox;
