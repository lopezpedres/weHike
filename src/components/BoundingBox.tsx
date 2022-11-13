import React, { useRef } from "react";
import type { MapRef } from "react-map-gl";

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
  const bboxPoints = bboxRef.current?.getBoundingClientRect();
  const latlan =
    bboxPoints && mapRef.current?.unproject([bboxPoints?.x, bboxPoints?.y]);
  console.log(latlan);

  return (
    <div ref={bboxRef} className="div-data">
      {"latitude" + viewState.latitude}
      {"longitude" + viewState.longitude}
    </div>
  );
};

export default BoundingBox;
