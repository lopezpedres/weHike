import { useState } from "react";
import { ImagesTrail, imageTrail } from "../MyTrailMap/typesMyTrailMap";

interface Props {
  trailImages: ImagesTrail;
}
const ImagesCollection = ({ trailImages }: Props) => {
  const [showImage, setShowImage] = useState(false);
  const [displayedImageDetails, setDisplayedImageDetails] = useState<
    imageTrail | undefined
  >();
  const onClickHandler = (value: imageTrail) => {
    setShowImage(true);
    setDisplayedImageDetails(value);
  };
  return (
    <section>
      <h5 className="px-7 text-xl font-semibold pb-4">Media</h5>
      {trailImages && (
        <ul className="grid grid-cols-3 gap-2 px-7">
          {Object.entries(trailImages)
            //TODO: Need to sort this by uploading date
            .sort()
            .map(([key, value]) => (
              <li key={key}>
                <img
                  onClick={() => onClickHandler(value)}
                  className="object-cover w-full h-full"
                  src={value.image_url}
                />
              </li>
            ))}
        </ul>
      )}
      {!trailImages && <h1>Loading</h1>}
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
