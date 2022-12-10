import React from "react";
import { TrailAtt } from "../../context/UserContentProvider/UserContentTypes";
import Tag from "../Tag/Tag";

const MyTrailsItem = ({ value }: { value: TrailAtt }) => {
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
        <li className="flex justify-between items-end">
          <div>
            <span className="block text-xs">ELEVATION GAIN</span>
            <span className="text-4xl font-semibold">11111m </span>
          </div>
          <div>
            <button className=" text-xs rounded-2xl border-2 border-primary bg-white right-0 py-2 px-4">
              SAVE
            </button>
          </div>
        </li>
      </ul>
    </li>
  );
};

export default MyTrailsItem;
