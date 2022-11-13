import { Position } from "geojson";

const getAreaPathNames = async (bbox: Position[]) => {
  const south = bbox[0][0];
  const west = bbox[0][1];
  const north = bbox[1][0];
  const east = bbox[1][1];
  const OSM_BASE_URL = import.meta.env.VITE_OSM_BASE_URL;
  const url = `${OSM_BASE_URL}+[out:json][timeout:25];(way["highway"="path"]["name"](${south},${west},${north},${east}););out tags;`;
  const response = await fetch(url);
  const json = await response.json();
};

export default getAreaPathNames;
