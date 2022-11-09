const getRoute = async (end: number[], start: number[]) => {
  const MAP_BOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;
  try {
    const query = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/walking/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${MAP_BOX_TOKEN}`,
      { method: "GET" }
    );
    const json = await query.json();
    const route = json.geometry.coordinates; //TODO:Need to create a type for the response
    const geojson: GeoJSON.Feature = {
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

export default getRoute;
