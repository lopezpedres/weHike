import { useState } from "react";
import { useModal } from "../../context/ImageModalProvider/ImageModalProvider";
import { ImagesTrail, imageTrail } from "../MyTrailMap/typesMyTrailMap";

interface Props {
  trailImages: ImagesTrail;
}
const ImagesCollection = ({ trailImages }: Props) => {
  const { showModal } = useModal();
  const [showImage, setShowImage] = useState(false);
  const [displayedImageDetails, setDisplayedImageDetails] = useState<
    imageTrail | undefined
  >();
  const onClickHandler = (value: imageTrail) => {
    setShowImage(true);
    setDisplayedImageDetails(value);
  };
  return (
    <section className="mb-4">
      <h5 className="px-7 text-xl font-semibold pb-4">Media</h5>
      {trailImages && (
        <ul className="grid grid-cols-3 gap-2 px-7">
          {Object.entries(trailImages)
            //TODO: Need to sort this by uploading date
            .sort()
            .map(([key, value]) => (
              <li key={key}>
                <img
                  onClick={() => showModal(value.image_url)}
                  className="object-cover w-full h-full"
                  src={value.image_url}
                />
              </li>
            ))}
        </ul>
      )}
      {Object.entries(trailImages).length === 0 && (
        <h1 className="max-w-sm m-4 p-7 border-2 text-lg">
          <span className=" font-semibold">
            You have no images in this trail!
          </span>
          <br />
          <span className="text-sm">Open the map to start adding images</span>
        </h1>
      )}
      {showImage && (
        <article className="absolute  top-1/2 -translate-y-1/2 overflow-y-hidden">
          <img
            onClick={() => setShowImage(false)}
            src={displayedImageDetails?.image_url}
            className=""
          />
        </article>
      )}
    </section>
  );
};

export default ImagesCollection;
