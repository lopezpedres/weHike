import React, { useContext } from "react";
import unixToDate from "../../utils/unixToDate";
import { Temp, WeatherEntity } from "../WeatherList/typesWeatherList";

interface Props {
  temp: Temp;
  weather: WeatherEntity[] | null | undefined;
  date: number;
}
const WeatherCard = ({ temp, weather, date }: Props) => {
  const formatedDate = unixToDate(date);
  const { icon } = weather?.length ? weather[0] : { icon: "empty" };
  const image_url = ` http://openweathermap.org/img/wn/${icon}@2x.png`;
  const temperatures = `${Math.round(temp.max)}° ${Math.round(temp.min)}°`;
  return (
    <div className=" flex flex-col items-center justify-center m-6 w-16">
      <div>{formatedDate}</div>
      <img className="" src={image_url} alt="Daily Weather" />
      <div className="w-20 text-center">{temperatures}</div>
    </div>
  );
};

export default WeatherCard;
