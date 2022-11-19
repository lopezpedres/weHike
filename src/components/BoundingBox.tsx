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
    <div
      onClick={() => bBoxHanlder()}
      ref={bboxRef}
      className="w-full h-1/3 absolute border-4 border-black top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      {"latitude " + viewState.latitude}
      <br />
      {"longitude " + viewState.longitude}
    </div>
  );
};

export default BoundingBox;
