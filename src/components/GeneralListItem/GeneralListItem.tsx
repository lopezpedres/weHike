import { Geometry } from "geojson";

interface Props {
  id: string;
  name: string;
  geometry: Geometry;
  sac_scale?: string | null;
}

const GeneralListItem = ({ id, name, geometry, sac_scale = null }: Props) => {
  return (
    <li className="mx-8">
      <ul className="mx-auto w-full p-8 shadow-lg bg-primary rounded-lg   ">
        <li>
          <h2 className="text-3xl font-semibold">{name}</h2>
        </li>
        <li>Difficulty</li>
        <li>Elevation</li>
        <li>Distance</li>
      </ul>
    </li>
  );
};

export default GeneralListItem;
