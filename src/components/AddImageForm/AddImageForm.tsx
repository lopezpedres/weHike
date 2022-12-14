import { GeoPoint } from "firebase/firestore";
import React, { useState } from "react";
import { useAuth } from "../../context/UserAuthProvider/UserAuthProvider";
import {
  addImageToTrail,
  postImageTrail,
} from "../../firebase/firebaseQueries/firebaseQueries";
import ImageIcon from "../ImageIcon/ImageIcon";
import exif from "exifr";
import getImageLocation from "../../utils/getImageLocation";
interface Props {
  SetDisplayAddImageSection: React.Dispatch<React.SetStateAction<boolean>>;
  images_id: string;
  notes_id: string;
  trail_id: string;
}
const AddImageForm = ({
  images_id,
  notes_id,
  trail_id,
  SetDisplayAddImageSection,
}: Props) => {
  const [file, setFile] = useState<File>();
  const [showForm, setShowForm] = useState(true);
  const [imageUrl, setImageUrl] = useState<string>();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [titleDescription, setTitleDescription] = useState({
    title: "",
    description: "",
  });
  const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) {
      const currentFile = e.currentTarget.files[0];
      const exifData = await exif.parse(currentFile);
      console.log("exifData", exifData);
      const url = URL.createObjectURL(currentFile);
      setImageUrl(url);
      setFile(currentFile);
    }
  };
  const onImageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      const imagePoint = await getImageLocation(file);
      const urlImageUploaded = await postImageTrail(file);
      if (urlImageUploaded && imagePoint) {
        await addImageToTrail({
          image_description: titleDescription.title,
          image_name: titleDescription.description,
          image_url: urlImageUploaded,
          trail_images_id: images_id,
          image_point: new GeoPoint(imagePoint.latitude, imagePoint.longitude),
        });
        setShowForm(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        setTimeout(() => SetDisplayAddImageSection(false), 2000);
      }
    }
  };
  const onChangeInputHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTitleDescription({
      ...titleDescription,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return (
    <section className="absolute flex flex-col p-6 shadow-md max-w-xs w-10/12 text-xl font-semibold  bg-white rounded-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      {showForm && (
        <form
          onSubmit={(e) => onImageSubmit(e)}
          className=" flex flex-col items-center w-full"
        >
          <label className="">
            <div className=" flex flex-col items-center w-full border-dashed border-2 p-4 rounded-md">
              {!file && (
                <div className="w-20">
                  <ImageIcon />
                </div>
              )}
              {file && <img className="rounded-lg" src={imageUrl} />}
              {!imageUrl ? (
                <span className=" text-sm w-full">Select Image to Upload</span>
              ) : (
                <span className=" text-sm text-center w-full pt-4">
                  Select a different image
                </span>
              )}
            </div>
            <input
              onChange={(e) => onChangeHandler(e)}
              type={"file"}
              className="hidden"
            />
          </label>
          {file && (
            <>
              <label className=" mt-4 w-full text-xs ">
                Title <br />
                <input
                  name="title"
                  onChange={(e) => onChangeInputHandler(e)}
                  className="w-full placeholder:font-normal py-2 outline-none"
                  placeholder="Type Something"
                />
              </label>
              <label className=" w-full text-xs ">
                Description <br />
                <textarea
                  name="description"
                  onChange={(e) => onChangeInputHandler(e)}
                  className="w-full placeholder:font-normal py-2 pb-9 outline-none"
                  placeholder="Type Something"
                />
              </label>
            </>
          )}
          {file && (
            <button className=" w-full bg-primary py-2 px-4 shadow-md  m-4 rounded-md">
              Add Image
            </button>
          )}
        </form>
      )}
      {success && <h1 className="text-center">Image Added!</h1>}
      {!success && (
        <button
          className=" w-full self-center  bg-primary py-2 px-4 shadow-md  m-4 rounded-md"
          onClick={() => SetDisplayAddImageSection(false)}
        >
          Cancel
        </button>
      )}
    </section>
  );
};

export default AddImageForm;
