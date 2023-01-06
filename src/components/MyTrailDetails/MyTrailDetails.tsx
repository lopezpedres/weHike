import { GeoPoint } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrailAtt } from "../../context/UserContentProvider/UserContentTypes";
import { updateUserTrails } from "../../firebase/firebaseQueries/firebaseQueries";
import ImagesCollection from "../ImagesCollection/ImagesCollection";
import { ImagesTrail } from "../MyTrailMap/typesMyTrailMap";
import Tag from "../Tag/Tag";
import WeatherList from "../WeatherList/WeatherList";
import chevronLeft from "/assets/icons/chevron-left.svg";

interface Props {
  trailImages: ImagesTrail;
  selectedMyTrailDetails: TrailAtt;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}
const MyTrailDetails = ({
  setShowMap,
  selectedMyTrailDetails,
  trailImages,
}: Props) => {
  const [newTag, setNewTag] = useState<string>();
  const {
    trail_name = "Example",
    distance,
    elevation_gain,
    max_elevation,
    trail_center,
  } = selectedMyTrailDetails;
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(-1);
  };
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setNewTag("");
    e.preventDefault();
    if (newTag) {
      const newTagBody = {
        ...selectedMyTrailDetails.tags,
        [newTag]: true,
      } as any;
      await updateUserTrails({
        trail_id: selectedMyTrailDetails.trail_id,
        tags: newTagBody,
        trail_name: selectedMyTrailDetails.trail_name,
      });
    }
  };
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.currentTarget.value);
  };
  return (
    <>
      {selectedMyTrailDetails && (
        <>
          <section className=" relative h-80  bg-cover  bg-[url(/assets/images/trail-bg.jpg)]">
            <div
              onClick={() => clickHandler()}
              className="p-2 rounded-full absolute bg-white top-4 left-4"
            >
              <img className="w-6" src={chevronLeft} />
            </div>
            <article className="opacity-90 w-full bg-white p-7 absolute top-20">
              <h1 className="text-3xl ">{trail_name}</h1>
              {/* <span className="text-[green]">easy</span> */}
            </article>
          </section>
          <section>
            <article className="rounded-3xl flex justify-center items-center relative h-36  bg-cover  bg-[url(/assets/images/generic-map.jpg)] shadow-lg">
              <div
                onClick={() => setShowMap(true)}
                className="border-2 border-primary rounded-md p-2"
              >
                <h5 className="text-xl font-semibold">Open in Map</h5>
              </div>
            </article>
            <article className=" opacity-90 pt-7 pb-2 px-7 flex flex-col justify-evenly  w-full  bottom-0 ">
              {/* <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">Distance</span>
                <span className="text-xl">2043 m</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">Max Altitud</span>
                <span className="text-xl">1244 km</span>
              </div> */}
              <div>
                <h1 className=" text-xl font-semibold mb-2">Tags</h1>
                {Object.entries(selectedMyTrailDetails.tags).map(
                  ([key, _value]) => (
                    <Tag
                      addDelete={true}
                      allTags={selectedMyTrailDetails}
                      key={key}
                      tagName={key}
                    />
                  )
                )}
              </div>
              <form onSubmit={(e) => onSubmitHandler(e)} className="mt-4">
                <input
                  value={newTag}
                  onChange={(e) => onChangeHandler(e)}
                  name="tag"
                  type="text"
                  placeholder="Add a Tag"
                  className="border-2 border-primary placeholder:text-sm p-2 rounded-md "
                />
                <button className="ml-2 p-2 bg-primary rounded-md">
                  New Tag
                </button>
              </form>
            </article>
            <WeatherList trailCenter={trail_center} />
          </section>
          <ImagesCollection trailImages={trailImages} />
          <>{selectedMyTrailDetails.tags.custom}</>
        </>
      )}
    </>
  );
};

export default MyTrailDetails;
