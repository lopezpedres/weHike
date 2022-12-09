import { MapboxGeoJSONFeature } from "react-map-gl";

/**
 *
 * @param g1
 * @param g2
 * @returns
 */
const mergeStringlineGeometries = (
  g1: MapboxGeoJSONFeature,
  g2: MapboxGeoJSONFeature
) => {
  if (g1.geometry.type === "LineString" && g2.geometry.type === "LineString") {
    const geometry1 = g1.geometry.coordinates;
    const geometry2 = g2.geometry.coordinates;

    // Create a new geometry array to store the result
    const newGeometry = [];

    // Loop through the coordinates in the first geometry
    for (let i = 0; i < geometry1.length; i++) {
      // Check if the current coordinates match any coordinates in the second geometry
      for (let j = 0; j < geometry2.length; j++) {
        if (
          geometry1[i][0] === geometry2[j][0] &&
          geometry1[i][1] === geometry2[j][1]
        ) {
          // If they match, add the coordinates from the first geometry up to the match point
          // to the newGeometry array
          newGeometry.push(...geometry1.slice(0, i + 1));

          // Then add the coordinates from the second geometry after the match point
          // to the newGeometry array
          newGeometry.push(...geometry2.slice(j + 1));

          // Return the newGeometry array
          return newGeometry;
        }
      }
    }
  }

  // If no match is found, return an empty array
  return [];
};

export default mergeStringlineGeometries;
