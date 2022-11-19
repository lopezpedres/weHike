import { Feature, Position } from "geojson";

interface bBoxSoWeNoEaType {
  south: number;
  west: number;
  north: number;
  east: number;
}
/**
 * Returns the geoJson of a specific path with the given ID
 * @param id
 * @param bBoxSoWeNoEa
 * @returns
 */
const getSinglePathRoute = async (
  pathId: number,
  bBoxSoWeNoEa: bBoxSoWeNoEaType
) => {
  const { south, west, north, east } = bBoxSoWeNoEa;
  const bboxUrlString = `(${pathId})(${south},${west},${north},${east})`;
  try {
    const OSM_BASE_URL = import.meta.env.VITE_OSM_BASE_URL;
    const url = `${OSM_BASE_URL}[out:json][timeout:25];(node ${bboxUrlString};way(${pathId})${bboxUrlString};relation(${pathId})${bboxUrlString};);out body;>;out skel qt;`;
    console.log(url);
    const response = await fetch(url);
    const json = await response.json();
    const route = json.routes[0].geometry.coordinates; //TODO:Need to create a type for the response
    const geojson: Feature = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    return geojson;
  } catch (err) {
    console.error(err);
  }
};

export default getSinglePathRoute;
