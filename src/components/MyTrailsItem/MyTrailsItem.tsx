import { TrailAtt } from "../../context/UserContentProvider/UserContentTypes";
import DeleteIcon from "../DeleteIcon/DeleteIcon";
import Tag from "../Tag/Tag";
import { deleteSingleTrail } from "../../firebase/firebaseQueries/firebaseQueries";

const MyTrailsItem = ({ value }: { value: TrailAtt }) => {
  const deleteHandler = async () => {
    await deleteSingleTrail(value.trail_id);
  };
  return (
    <li className="mx-8 my-4 ">
      <ul className="mx-auto border-primary  w-full p-6 shadow-md rounded-lg   ">
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
          <div onClick={() => deleteHandler()} className="w-6 self-end">
            <DeleteIcon />
          </div>
        </li>
      </ul>
    </li>
  );
};

export default MyTrailsItem;
