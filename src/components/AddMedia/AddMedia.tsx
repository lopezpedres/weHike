import React, { useState } from "react";
import AddIcon from "../AddIcon/AddIcon";
import AddImageForm from "../AddImageForm/AddImageForm";
interface Props {
  images_id: string;
  notes_id: string;
  trail_id: string;
}
const AddMedia = ({ trail_id, images_id, notes_id }: Props) => {
  const [displayOptions, setDisplayOptions] = useState(false);
  const [displayAddImageSection, SetDisplayAddImageSection] = useState(false);
  const onClickImage = () => {
    setDisplayOptions(false);
    SetDisplayAddImageSection(true);
  };
  return (
    <section>
      <div
        onClick={() => setDisplayOptions(!displayOptions)}
        className="absolute w-12 bottom-10 right-2"
      >
        <AddIcon />
      </div>
      {displayOptions && (
        <article className="absolute p-10 shadow-md max-w-xs w-10/12 text-xl font-semibold  bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <button
            onClick={() => onClickImage()}
            className="w-full border-2 shadow-md hover:bg-primary rounded-md py-4 my-4 border-[black]"
          >
            Add Image
          </button>
          <button
            onClick={() => onClickImage()}
            className="w-full border-2 shadow-md hover:bg-primary rounded-md py-4 my-4 border-[black]"
          >
            Add Note
          </button>
        </article>
      )}
      {displayAddImageSection && (
        <AddImageForm
          images_id={images_id}
          notes_id={notes_id}
          trail_id={trail_id}
          SetDisplayAddImageSection={SetDisplayAddImageSection}
        />
      )}
    </section>
  );
};

export default AddMedia;
