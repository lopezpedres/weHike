import { Feature, Position } from "geojson";

const getPointToPointRoute = async (end: Position, start: Position) => {
  const MAP_BOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;
  try {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&overview=full&access_token=${MAP_BOX_TOKEN}`,
      { method: "GET" }
    );
    const json = await query.json();
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

export default getPointToPointRoute;
