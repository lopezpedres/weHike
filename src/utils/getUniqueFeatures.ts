import { MapboxGeoJSONFeature } from "react-map-gl";

/**
 * Filters out all the repited features based on the given comparator
 * @param features
 * @param comparatorProperty
 * @returns
 */
const getUniqueFeatures = (
  features: MapboxGeoJSONFeature[] | undefined,
  comparatorProperty: string
) => {
  const uniqueIds = new Set();
  const uniqueFeatures = [];
  if (features) {
    for (const feature of features) {
      const id = feature.properties && feature.properties[comparatorProperty];
      if (!uniqueIds.has(id)) {
        uniqueIds.add(id);
        uniqueFeatures.push(feature);
      }
    }
  }
  return uniqueFeatures;
};
export default getUniqueFeatures;
