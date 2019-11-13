import { has, isEmpty, slice } from 'lodash';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import WeatherCurrent from './WeatherCurrent';
import WeatherDaily from './WeatherDaily';
import WeatherHourlyGraph from './WeatherHourlyGraph';

const { ipcRenderer } = window.require("electron");

const Weather = (props) => {
  const { className } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);
  const [error, setError] = useState('');
  const [alert, setAlert] = useState({})
  const [currently, setCurrently] = useState({})
  const [hourly, setHourly] = useState({})
  const [daily, setDaily] = useState({})

  useEffect(() => {
    ipcRenderer.on('weather-response', (event, weather) => {
      if (has(weather, 'error')) {
        setError(weather);
        setIsError(true);
        return
      }

      if (!isEmpty(weather.alerts)) {
        setAlert(weather.alerts[0])
      }

      setCurrently(weather.currently);
      setHourly(weather.hourly);
      setDaily(weather.daily);

      setIsLoading(false);
      setIsError(false);
    })

    const invokeWeatherUpdate = () => ipcRenderer.send('weather-request');

    const interval = setInterval(invokeWeatherUpdate, 1000 * 60 * 15);
    invokeWeatherUpdate()
    return () => {
      clearInterval(interval);
      ipcRenderer.removeAllListeners('weather-response')
    }
  }, []);

  return (
    (!isLoading && !isError && (
      <div className={classNames(className, 'weather')}>
        <WeatherCurrent alert={alert} currently={currently} />
        <WeatherHourlyGraph hourly={slice(hourly.data, 1, 10)} />
        <WeatherDaily days={slice(daily.data, 1, 8)} />
      </div>
    )) || <div className={classNames(className, 'weather')} />
  );
}

export default Weather;

Weather.defaultProps = {
  className: 'bottom-center',
};
