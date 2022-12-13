import { TrailAtt } from "../../context/UserContentProvider/UserContentTypes";
import DeleteIcon from "../DeleteIcon/DeleteIcon";
import Tag from "../Tag/Tag";
import { deleteSingleTrail } from "../../firebase/firebaseQueries/firebaseQueries";
import { useNavigate } from "react-router-dom";
import toSlug from "../../utils/toSlug";
import { useContext } from "react";
import { userContentDispatch } from "../../context/UserContentProvider/UserContentProvider";

const MyTrailsItem = ({ value }: { value: TrailAtt }) => {
  const dispatch = useContext(userContentDispatch);
  const navigate = useNavigate();
  const deleteHandler = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    await deleteSingleTrail(value.trail_id);
  };
  const onClickHandler = () => {
    dispatch({ type: "SET-SELECTED-MY-TRAIL-NAME", payload: value.trail_name });
    navigate(`/my-trails/${toSlug(value.trail_name)}`);
  };
  return (
    <li className="mx-8 my-4 ">
      <ul
        onClick={() => onClickHandler()}
        className="mx-auto  w-full p-6 shadow-md rounded-lg   "
      >
        <li className="pb-4">
          <>
            <h2 className="text-2xl truncate hover:text-clip">
              {value.trail_name}
            </h2>
            {Object.entries(value.tags).map(
              ([key, value], index) =>
                value && <Tag key={index} tagName={key} />
            )}
          </>
        </li>
        <li className="flex justify-between items-center">
          <div>
            <span className="block text-xs">ELEVATION GAIN</span>
            <span className="text-4xl font-semibold">11111m </span>
          </div>
          <div onClick={(e) => deleteHandler(e)} className="w-6 self-end">
            <DeleteIcon />
          </div>
        </li>
      </ul>
    </li>
  );
};

export default MyTrailsItem;
