import { useNavigate } from "react-router-dom";
import { SelectedtrailDetails } from "../../context/UserContentProvider/UserContentTypes";
import WeatherList from "../WeatherList/WeatherList";
import chevronLeft from "/assets/icons/chevron-left.svg";

interface Props {
  selectedtrailDetails: SelectedtrailDetails;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}
export const TrailDetails = ({ selectedtrailDetails, setShowMap }: Props) => {
  const {
    trailName,
    distance,
    elevationGain,
    elevationMax,
    trailCenter,
    sac_scale,
  } = selectedtrailDetails;

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(-1);
  };
  return (
    <>
      <section className=" relative h-96  bg-cover  bg-[url(/assets/images/mtn.jpg)]">
        <div
          onClick={() => clickHandler()}
          className="p-2 rounded-full absolute bg-white top-4 left-4"
        >
          <img className="w-6" src={chevronLeft} />
        </div>
        <article className="opacity-90 w-full bg-white p-7 absolute top-20">
          <h1 className="text-3xl ">{trailName}</h1>
          <span className="text-[green]">{sac_scale}</span>
        </article>
        <article className=" p-7 flex justify-around absolute w-full rounded-t-3xl bg-primary bottom-0 shadow-xl">
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold">Distance</span>
            <span className="text-xl">{distance} m</span>
          </div>
          {elevationGain && (
            <div className="flex flex-col items-center">
              <span className="text-xs font-semibold">Elevation Gain</span>
              <span className="text-xl">{elevationGain} m</span>
            </div>
          )}
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold">Max Altitud</span>
            <span className="text-xl">{elevationMax} m</span>
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
        <WeatherList trailCenter={trailCenter} />
      </section>
    </>
  );
};
