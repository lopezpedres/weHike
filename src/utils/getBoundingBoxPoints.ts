import { Position } from "geojson";
import { MutableRefObject } from "react";
import { LngLatBounds, MapRef } from "react-map-gl";
import getAreaPathNames from "./getBboxPathNames";
interface AttributesInterface {
  bboxRef: MutableRefObject<HTMLDivElement | null>;
  mapRef: MutableRefObject<MapRef | null>;
}
const getBoundingBoxPoints = ({ bboxRef, mapRef }: AttributesInterface) => {
  const bboxPoints = bboxRef.current?.getBoundingClientRect();

  if (bboxPoints && mapRef.current) {
    const lefTop = mapRef.current.unproject([
      bboxPoints?.left,
      bboxPoints?.top,
    ]);
    const rightBotton = mapRef.current.unproject([
      bboxPoints.right,
      bboxPoints.bottom,
    ]);

    const bBoxValues: Position[] = [
      [lefTop?.lat, lefTop?.lng],
      [rightBotton?.lat, rightBotton?.lng],
    ];
    const bBoxSoWeNoEa = {
      south: bBoxValues[1][0],
      west: bBoxValues[0][1],
      north: bBoxValues[0][0],
      east: bBoxValues[1][1],
    };
    // getAreaPathNames(bBoxValues); This needs call outside of this component
    return bBoxSoWeNoEa;
  } else return null;
};
export default getBoundingBoxPoints;
