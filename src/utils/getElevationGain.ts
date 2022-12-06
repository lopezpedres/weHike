import { FeatureCollection } from "geojson";
import { useContext } from "react";
import { MapboxGeoJSONFeature, MapRef, LngLatLike } from "react-map-gl";

const getElevationGain = (
  geometriesOfSingleTrail: FeatureCollection[],
  globalMap: MapRef
) => {
  const elevationInMeters = geometriesOfSingleTrail.map(({ features }) => {
    const { geometry } = features[0];
    if (geometry.type === "LineString") {
      const elevationArray = geometry.coordinates.map((coor) => {
        const elevation = globalMap.queryTerrainElevation(coor as LngLatLike);
        return elevation;
      });
      return elevationArray;
    }
  });
  return elevationInMeters;
};
export default getElevationGain;
