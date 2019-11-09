import { isEmpty, round } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import WeatherSVG from './WeatherSVG';

const WeatherCurrent = props => {
  const {
    alert,
    currently: {
      apparentTemperature,
      humidity,
      icon,
      precipProbability,
      summary,
      temperature,
    },
  } = props;

  const region = 'City of Toronto';
  const warning = !isEmpty(alert) && alert.regions.includes(region) && (
    <div className='weather-alert'>
      {alert.severity}: {alert.title}
    </div>
  );

  return (
    <div className='weather-current'>
      <div className='weather-current-conditions'>
        <div className='flex'>
          <WeatherSVG height={128} icon={icon} width={128} />
          <div className='weather-current-temp'>{round(temperature)}&deg;C</div>
        </div>
        <div>{summary}</div>
      </div>

      <div className='weather-current-extra'>
        <div>Precipitation: {round(precipProbability * 100)}%</div>
        <div>Humidity: {round(humidity * 100)}%</div>
        <div>Feels Like: {round(apparentTemperature)}&deg;C</div>
        {warning}
      </div>
    </div>
  );
};

export default WeatherCurrent;

WeatherCurrent.defaultProps = {
  alert: {},
};

WeatherCurrent.propTypes = {
  alert: PropTypes.objectOf({
    regions: PropTypes.array,
    severity: PropTypes.string,
    title: PropTypes.string,
  }),
  currently: PropTypes.objectOf({
    apparentTemperature: PropTypes.number.isRequired,
    humidity: PropTypes.number.isRequired,
    icon: PropTypes.string.isRequired,
    precipProbability: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    temperature: PropTypes.number.isRequired,
  }).isRequired,
};
