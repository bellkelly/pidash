import { map } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import WeatherDay from './WeatherDay';

const WeatherDaily = props => {
  const { days } = props;
  return (
    <div className='weather-daily'>
      {map(days, day => (
        <WeatherDay key={day.time} {...day} />
      ))}
    </div>
  );
};

WeatherDaily.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      temperatureHigh: PropTypes.number.isRequired,
      temperatureLow: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default WeatherDaily;
