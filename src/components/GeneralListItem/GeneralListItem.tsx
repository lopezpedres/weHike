import { Geometry } from "geojson";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContentDispatch } from "../../context/UserContentProvider/UserContentProvider";

interface Props {
  id?: string;
  name?: string;
  geometry?: Geometry;
  sac_scale?: string | null;
}

const GeneralListItem = ({ id, name, geometry, sac_scale = null }: Props) => {
  const navigate = useNavigate();
  const dispatch = useContext(userContentDispatch);
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
  const clickHandler = (name: string) => {
    dispatch({ type: "SET-SELECTED-TRAIL", payload: name });
    navigate(`/${toSlug(name)}`);
  };
  return (
    <>
      {name && (
        <li onClick={() => clickHandler(name)} className="mx-8 my-4 ">
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
        </li>
      )}
    </>
  );
};

export default GeneralListItem;
