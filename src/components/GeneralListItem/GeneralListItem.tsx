import { GeoPoint } from "firebase/firestore";
import { Geometry, Point, Position } from "geojson";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContentDispatch } from "../../context/UserContentProvider/UserContentProvider";
import { addUserTrail } from "../../firebase/firebaseQueries/firebaseQueries";
import toSlug from "../../utils/toSlug";
interface Props {
  id?: string;
  name?: string;
  trail_center?: Position;
  sac_scale?: string;
  elevation_gain?: number;
  max_elevation?: number;
  distance?: number;
}

const GeneralListItem = ({
  id,
  name,
  trail_center,
  sac_scale,
  elevation_gain,
  max_elevation,
  distance,
}: Props) => {
  // const randomTrailCenter: Position | false =
  //   geometry?.type === "LineString" && geometry.coordinates[0];
  const navigate = useNavigate();
  const dispatch = useContext(userContentDispatch);
  const clickHandler = (name: string) => {
    navigate(`/trails/${toSlug(name)}`);
    dispatch({ type: "SET-SELECTED-TRAIL-NAME", payload: name });
    dispatch({ type: "SET-SELECTED-TRAIL-ID", payload: id });
    if (sac_scale) {
      dispatch({ type: "SET-SELECTED-TRAIL-SAC-SCALE", payload: sac_scale });
    }
    if (max_elevation) {
      dispatch({
        type: "SET-SELECTED-TRAIL-MAX-ELEVATION",
        payload: max_elevation,
      });
    }
    if (distance) {
      dispatch({
        type: "SET-SELECTED-TRAIL-DISTANCE",
        payload: distance,
      });
    }
    if (trail_center) {
      dispatch({
        type: "SET-SELECTED-TRAIL-CENTER",
        payload: trail_center,
      });
    }
  };
  //!This object should have the ids of all the trails with the same name
  //!for now, I will only save the name of the trail, cause it;s all I need to
  //!render the trails of my map
  const addTrailHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const splitedId = id?.split("/")[1];
    if (name && splitedId && trail_center) {
      const centerGeoPoint = new GeoPoint(trail_center[1], trail_center[0]);
      try {
        await addUserTrail({
          trail_id: splitedId,
          trail_name: name,
          tags: {
            planning: true,
          },
          trail_center: centerGeoPoint,
          //I need to follow the pipeline of all this attributes
          sac_scale,
          elevation_gain,
          max_elevation,
          distance,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      {name && (
        <li onClick={() => clickHandler(name)} className="mx-8 my-4 ">
          <ul className="mx-auto border-primary  w-full p-6 shadow-md rounded-lg   ">
            <li className="pb-4">
              <h2 className="text-2xl truncate hover:text-clip">{name}</h2>
              <span className="text-[green]">{sac_scale}</span>
            </li>
            <li className="flex justify-between items-end">
              <div>
                <span className="block text-xs">LENGTH</span>
                <span className="text-3xl font-semibold">{distance}m </span>
              </div>
              <div>
                {/* <button
                  onClick={(e) => addTrailHandler(e)}
                  className=" text-xs rounded-2xl border-2 border-primary bg-white right-0 py-2 px-4"
                >
                  SAVE
                </button> */}
                <div>
                  <span className="block text-xs">MAX ELEVATION</span>
                  <span className="text-3xl font-semibold">
                    {max_elevation}m{" "}
                  </span>
                </div>
                <div></div>
              </div>
            </li>
          </ul>
        </li>
      )}
    </>
  );
};

export default GeneralListItem;
