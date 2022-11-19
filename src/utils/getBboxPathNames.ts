interface AttributesInterface {
  south: number;
  west: number;
  north: number;
  east: number;
}
const getBboxPathNames = async (bBoxSoWeNoEa: AttributesInterface) => {
  const { south, west, north, east } = bBoxSoWeNoEa;
  try {
    const OSM_BASE_URL = import.meta.env.VITE_OSM_BASE_URL;
    const url = `${OSM_BASE_URL}[out:json][timeout:25];(way["highway"="path"]["name"](${south},${west},${north},${east}););out tags;`;
    console.log(url);
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
  } catch (err) {
    console.log(err);
  }
};

export default getBboxPathNames;
