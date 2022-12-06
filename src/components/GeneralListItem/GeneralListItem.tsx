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
    navigate(`/trails/${toSlug(name)}`);
  };
  return (
    <>
      {name && (
        <li onClick={() => clickHandler(name)} className="mx-8 my-4 ">
          <ul className="mx-auto border-primary  w-full p-6 shadow-md rounded-lg   ">
            <li className="pb-4">
              <h2 className="text-2xl truncate hover:text-clip">{name}</h2>
              <span className="text-[green]">easy</span>
            </li>
            <li className="flex justify-between items-end">
              <div>
                <span className="block text-xs">ELEVATION GAIN</span>
                <span className="text-4xl font-semibold">2768 m </span>
              </div>
              <div>
                <button className=" text-xs rounded-2xl border-2 border-primary bg-white right-0 py-2 px-4">
                  SAVE
                </button>
              </div>
            </li>
          </ul>
        </li>
      )}
    </>
  );
};

export default GeneralListItem;
