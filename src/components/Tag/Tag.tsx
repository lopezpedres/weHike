import {
  Tags,
  TrailAtt,
} from "../../context/UserContentProvider/UserContentTypes";
import { updateUserTrails } from "../../firebase/firebaseQueries/firebaseQueries";

interface Props {
  tagName: string;
  addDelete?: boolean;
  allTags?: TrailAtt;
}
const Tag = ({ tagName, addDelete, allTags }: Props) => {
  const onClickHandler = async (tagName: string) => {
    console.log("click");
    if (allTags) {
      const tagNames = Object.entries(allTags.tags).map(([key, _value]) => key);
      console.log(tagNames);
      const filteredTags = tagNames.filter((tag) => tag !== tagName);
      if (filteredTags) {
        const newBody = {} as any;
        filteredTags.forEach((tag) => {
          return (newBody[tag] = true);
        });
        console.log(newBody);
        await updateUserTrails({
          trail_id: allTags.trail_id,
          tags: newBody,
          trail_name: allTags.trail_name,
        });
      }
    }
  };
  return (
    <>
      {tagName === "planning" && (
        <div
          className={`
          relative
      mr-2
      text-[0.6rem]
      inline-flex 
      items-center 
      leading-sm 
      uppercase 
      px-3 
      py-1 
      bg-tag-light-orange
      text-tag-dark-orange
      rounded-full`}
        >
          {tagName}
          {addDelete && (
            <span
              onClick={() => onClickHandler(tagName)}
              className=" ml-2 text-[#000000] right-0 font-semibold "
            >
              x
            </span>
          )}
        </div>
      )}
      {tagName === "done" && (
        <div
          className={`
      mr-2
      text-[0.6rem]
      inline-flex 
      items-center 
      leading-sm 
      uppercase 
      px-3 
      py-1 
      bg-tag-light-green
      text-tag-dark-green
      rounded-full`}
        >
          {tagName}
          {addDelete && (
            <span
              onClick={() => onClickHandler(tagName)}
              className=" ml-2 text-[#000000] right-0 font-semibold "
            >
              x
            </span>
          )}
        </div>
      )}
      {tagName === "custom" && (
        <div
          className={`
      mr-2
      text-[0.6rem]
      inline-flex 
      items-center 
      leading-sm 
      uppercase 
      px-3 
      py-1 
      bg-tag-light-blue
      text-tag-dark-blue
      rounded-full`}
        >
          {tagName}
          {addDelete && (
            <span
              onClick={() => onClickHandler(tagName)}
              className=" ml-2 text-[#000000] right-0 font-semibold "
            >
              x
            </span>
          )}
        </div>
      )}
      {tagName === "fav" && (
        <div
          className={`
      mr-2
      text-[0.6rem]
      inline-flex 
      items-center 
      leading-sm 
      uppercase 
      px-3 
      py-1 
      bg-tag-light-yellow
      text-tag-dark-yellow
      rounded-full`}
        >
          {tagName}
          {addDelete && (
            <span
              onClick={() => onClickHandler(tagName)}
              className=" ml-2 text-[#000000] right-0 font-semibold "
            >
              x
            </span>
          )}
        </div>
      )}
      {tagName !== "planning" &&
        tagName !== "done" &&
        tagName !== "custom" &&
        tagName !== "fav" && (
          <div
            className={`
      m-2
      text-[0.6rem]
      inline-flex 
      items-center 
      leading-sm 
      uppercase 
      px-3 
      py-1 
      bg-[#f3f4f6]
      text-[#475569]
      rounded-full`}
          >
            {tagName}
            {addDelete && (
              <span
                onClick={() => onClickHandler(tagName)}
                className=" ml-2 text-[#000000] right-0 font-semibold "
              >
                x
              </span>
            )}
          </div>
        )}
    </>
  );
};

export default Tag;
