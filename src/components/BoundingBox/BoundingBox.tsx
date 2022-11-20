import React, { useRef } from "react";
import type { MapRef } from "react-map-gl";
import getBoundingBoxPoints from "../../utils/getBoundingBoxPoints";
interface bboxInterface {
  south: number;
  west: number;
  north: number;
  east: number;
}

interface PropsInterface {
  setCurrentBbox: React.Dispatch<React.SetStateAction<bboxInterface | null>>;
  mapRef: React.MutableRefObject<MapRef | null>;
}
const BoundingBox = ({ setCurrentBbox, mapRef }: PropsInterface) => {
  const bboxRef = useRef<HTMLDivElement | null>(null);
  const bBoxHanlder = () => {
    console.log("Hi Bbox Handlder");
    const bboxPoints = getBoundingBoxPoints({ bboxRef, mapRef });
    setCurrentBbox(bboxPoints);
  };

  return (
    <div
      onClick={() => bBoxHanlder()}
      ref={bboxRef}
      className="w-full md:w-1/2 h-1/3 absolute border-2 border-dashed border-primary top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
    ></div>
  );
};

export default BoundingBox;
