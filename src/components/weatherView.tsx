import React from 'react';
import {WeatherData} from '../components/forecast';

export default function ({ data, reload }) {
  const {
    clouds: { all },
      main: {
        feels_like,
        humidity,
        pressure,
        temp,
        temp_max,
        temp_min,
      },
      wind: {speed, deg}
  } = data;

  return (
    <div>
      Температура <span className={"temp"}>{temp}</span> 
      , ощущается как <span className={"temp"}>{feels_like}</span>
      <br />
      Облачность {all}%, 
      Давление {pressure} мм.рт.ст., 
      Влажность {humidity}%, 
      Ветер {speed} м/с 
      <br />
      <button onClick={reload}>Обновить</button>

      <style>{`
        .temp {
          ${temp > 0 ? "color: red;":"color: blue;"}
        } 
      `}
      </style>
    </div>
  )
}