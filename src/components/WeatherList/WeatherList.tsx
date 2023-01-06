import { Position } from "@turf/helpers";
import { GeoPoint } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { userContentState } from "../../context/UserContentProvider/UserContentProvider";
import getWeatherData from "../../utils/getWeatherData";
import WeatherCard from "../WeatherCard/WeatherCard";
import { Current, DailyEntity, Weather } from "./typesWeatherList";
interface Props {
  trailCenter: GeoPoint;
}
const WeatherList = ({ trailCenter }: Props) => {
  const [forecast, setForecast] = useState<DailyEntity[] | null | undefined>();
  const { selectedtrailDetails } = useContext(userContentState);
  const [currentWeather, setCurretnWeather] = useState<Current>();

  //Getting data from API
  const getData = async () => {
    const { daily, current } = await getWeatherData(trailCenter);
    if (daily) {
      setForecast(daily);
    }
    if (current) {
      setCurretnWeather(current);
    }
  };
  useEffect(() => {
    getData();
  }, [selectedtrailDetails]);
  const curretnIcon = currentWeather?.weather
    ? currentWeather?.weather[0].icon
    : "";
  const image_url = ` http://openweathermap.org/img/wn/${curretnIcon}@2x.png`;
  return (
    <div className="mt-4 bg-white">
      <h1 className=" text-xl font-semibold mx-6">Weather</h1>
      <section className="flex items-center ">
        <article className="flex items-center">
          <img src={image_url} />
          <h5 className="text-xl font-semibold mx-2">
            {currentWeather?.temp && Math.floor(currentWeather?.temp)}°
          </h5>
        </article>
        <article className="flex flex-col px-10">
          <span className="text-sm font-semibold ml-2">
            Humidity: {currentWeather?.humidity}
          </span>
          <span className="text-sm font-semibold ml-2">
            Feels Like: {currentWeather?.feels_like}°
          </span>
          <span className="text-sm font-semibold ml-2">
            Wind Speed: {currentWeather?.wind_speed}
          </span>
        </article>
      </section>
      {forecast ? (
        // !Need to add arrows to show that there are more info to show
        <section className="flex flex-col">
          <h1 className="text-sm font-semibold mx-6">Next week</h1>
          <div className="scrollbar-hide w-full flex overflow-x-auto">
            {forecast.map((daily) => (
              <WeatherCard
                key={daily.dt}
                date={daily.dt}
                temp={daily.temp}
                weather={daily.weather}
              />
            ))}
          </div>
        </section>
      ) : (
        <p className="text-xl text-center font-semibold">
          Loading weather data
        </p>
      )}
    </div>
  );
};

export default WeatherList;
