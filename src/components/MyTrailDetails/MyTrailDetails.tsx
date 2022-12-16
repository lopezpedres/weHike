import { GeoPoint } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { TrailAtt } from "../../context/UserContentProvider/UserContentTypes";
import WeatherList from "../WeatherList/WeatherList";
import chevronLeft from "/assets/icons/chevron-left.svg";

interface Props {
  selectedMyTrailDetails: TrailAtt;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}
const MyTrailDetails = ({ setShowMap, selectedMyTrailDetails }: Props) => {
  const { trail_name, distance, elevation_gain, max_elevation, trail_center } =
    selectedMyTrailDetails;
  //!This fixes my issue but I need to change the type of trail_center from number[] to Geopoint
  const { latitude, longitude } = trail_center as unknown as GeoPoint;
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(-1);
  };
  return (
    <>
      {selectedMyTrailDetails && (
        <>
          <section className=" relative h-96  bg-cover  bg-[url(/assets/images/mtn.jpg)]">
            <div
              onClick={() => clickHandler()}
              className="p-2 rounded-full absolute bg-white top-4 left-4"
            >
              <img className="w-6" src={chevronLeft} />
            </div>
            <article className="opacity-90 w-full bg-white p-7 absolute top-20">
              <h1 className="text-3xl ">{trail_name}</h1>
              <span className="text-[green]">easy</span>
            </article>
            <article className=" p-7 flex justify-evenly absolute w-full rounded-t-3xl bg-primary bottom-0 shadow-xl">
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">Distance</span>
                <span className="text-xl">2043 m</span>
              </div>
              {/* <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">Elevation Gain</span>
                <span className="text-xl">904 m</span>
              </div> */}
              <div className="flex flex-col items-center">
                <span className="text-xs font-semibold">Max Altitud</span>
                <span className="text-xl">1244 km</span>
              </div>
            </article>
          </section>
          <section>
            <article className="flex justify-center items-center mt-4 relative h-36  bg-cover  bg-[url(/assets/images/generic-map.jpg)]">
              <div
                onClick={() => setShowMap(true)}
                className="border-2 border-primary rounded-md p-2"
              >
                <h5 className="text-xl font-semibold">Open in Map</h5>
              </div>
            </article>
            <article></article>
            <WeatherList trailCenter={[latitude, longitude]} />
          </section>
        </>
      )}
    </>
  );
};

export default MyTrailDetails;
