interface AttributesInterface {
  south: number;
  west: number;
  north: number;
  east: number;
}
export interface ElementInterface {
  type: string;
  id: number;
  tags: Tags;
}
export interface Tags {
  bicycle: string;
  dog: string;
  foot: string;
  highway: string;
  name: string;
  sac_scale: string;
}

const getBboxPathNames = async (bBoxSoWeNoEa: AttributesInterface | null) => {
  if (bBoxSoWeNoEa) {
    const { south, west, north, east } = bBoxSoWeNoEa;
    try {
      const OSM_BASE_URL = import.meta.env.VITE_OSM_BASE_URL;
      const url = `${OSM_BASE_URL}[out:json][timeout:25];(way["highway"="path"]["name"](${south},${west},${north},${east}););out tags;`;
      const response = await fetch(url);
      const json = await response.json();
      const pathNames: [] = json.elements.map(
        (el: ElementInterface) => el.tags.name
      );
      return pathNames;
    } catch (err) {
      console.log(err);
    }
  } else {
    console.error("No bboxPointsProvided");
  }
};

export default getBboxPathNames;
