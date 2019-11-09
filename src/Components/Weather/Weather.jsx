import { slice, isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import WeatherCurrent from './WeatherCurrent';
import WeatherDaily from './WeatherDaily';
import WeatherHourlyGraph from './WeatherHourlyGraph';

const electron = window.require('electron');

const Weather = (props) => {
  const { className } = props;

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(true);
  const [alert, setAlert] = useState({})
  const [currently, setCurrently] = useState({})
  const [hourly, setHourly] = useState({})
  const [daily, setDaily] = useState({})

  useEffect(() => {
    const invokeWeatherUpdate = () => {
      electron.ipcRenderer.invoke('weatherUpdate')
      .then((weather) => {
        if (!isEmpty(weather.data.alerts)) {
          setAlert(weather.data.alerts[0])
        }

        setCurrently(weather.data.currently);
        setHourly(weather.data.hourly);
        setDaily(weather.data.daily);

        setLoading(false);
        setError(false);
      })
    .catch((error) => {
        setError(true);
      })
    }

    const interval = setInterval(invokeWeatherUpdate, 1000 * 60 * 3);
    invokeWeatherUpdate()
    return () => clearInterval(interval);
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
