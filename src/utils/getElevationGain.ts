import { FeatureCollection } from "geojson";
import { useContext } from "react";
import { MapboxGeoJSONFeature, MapRef, LngLatLike } from "react-map-gl";
import getActualElevationGain from "./getActualElevationGain";

const getElevationGain = (
  geometriesOfSingleTrail: MapboxGeoJSONFeature,
  globalMap: MapRef
) => {
  if (geometriesOfSingleTrail.geometry.type === "LineString") {
    const elevationArray = geometriesOfSingleTrail.geometry.coordinates.map(
      (coor) => {
        const elevation = globalMap.queryTerrainElevation(coor as LngLatLike);
        return elevation;
      }
    );
    const actualElvGainTotal = Math.floor(
      getActualElevationGain(elevationArray)
    );
    return actualElvGainTotal;
  }
};
export default getElevationGain;
