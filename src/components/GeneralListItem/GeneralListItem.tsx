import { Geometry } from "geojson";
import { Link } from "react-router-dom";

interface Props {
  id?: string;
  name?: string;
  geometry?: Geometry;
  sac_scale?: string | null;
}

const GeneralListItem = ({ id, name, geometry, sac_scale = null }: Props) => {
  const toSlug = (name: string | undefined) => {
    return (
      name &&
      name
        .toLocaleLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
        .trim()
    );
  };
  toSlug(name);
  return (
    <li className="mx-8 my-4 ">
      <Link to={`/navigate/${toSlug(name)}`}>
        <ul className="mx-auto  w-full p-8 shadow-md bg-primary rounded-lg   ">
          <li>
            <h2 className="text-3xl font-semibold">{name}</h2>
          </li>
          {/* //TODO: Need to have a difficulty chart to display something like easy, */}
          medium, hard
          {/* <li>Difficulty:{sac_scale ? sac_scale : "Not available"}</li> */}
          <li>Elevation</li>
          <li>Distance</li>
        </ul>
      </Link>
    </li>
  );
};

export default GeneralListItem;
