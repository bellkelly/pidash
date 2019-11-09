import { round } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import WeatherSVG from './WeatherSVG';

const WeatherDay = props => {
  const { icon, temperatureHigh, temperatureLow, time } = props;

  return (
    <div className='column-flex'>
      <div className='weather-small-day'>
        {moment.unix(time).format('dddd')}
      </div>
      <div>
        <WeatherSVG height={36} icon={icon} width={36} />
      </div>
      <div className='flex'>
        <div className='weather-small-temp'>{round(temperatureLow)}&deg;C</div>
        <div className='weather-small-temp'>{round(temperatureHigh)}&deg;C</div>
      </div>
    </div>
  );
};

WeatherDay.propTypes = {
  icon: PropTypes.string.isRequired,
  temperatureHigh: PropTypes.number.isRequired,
  temperatureLow: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};

export default WeatherDay;
