import React, { useEffect, useState } from "react";
import { getWeatherForecast } from "../common/api";
import { ForecastElement } from "../common/interfaces";

export const WeatherForecast = (props: { dateTime: string }) => {
  const { dateTime } = props;
  const [forecasts, setForecasts] = useState<ForecastElement[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const res = await getWeatherForecast(dateTime);
      setForecasts(res.items[0].forecasts);
    };
    fetchForecast();
  }, [dateTime]);

  return (
    <div>
      <h1> Weather Forecast</h1>

      {forecasts.map((forecast) => {
        return (
          <div>
            {forecast.area} : {forecast.forecast}
          </div>
        );
      })}
    </div>
  );
};
