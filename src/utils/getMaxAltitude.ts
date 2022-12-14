import { MapRef } from "react-map-gl";

const getMaxAltitude = (
  featuresNameGroup: mapboxgl.MapboxGeoJSONFeature[],
  globalMap: MapRef
) => {
  const maxAlt = featuresNameGroup.map((feature) => {
    if (feature.geometry.type === "LineString") {
      const allElevations = feature.geometry.coordinates.map((coord) => {
        const singleElevation = globalMap.queryTerrainElevation([
          coord[0],
          coord[1],
        ]);
        if (singleElevation) {
          return singleElevation;
        } else {
          return 0;
        }
      });

      return Math.floor(Math.max(...allElevations));
    } else return 0;
  });
  return Math.max(...maxAlt);
};

export default getMaxAltitude;
