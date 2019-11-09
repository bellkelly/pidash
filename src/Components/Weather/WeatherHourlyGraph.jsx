import { map, minBy, maxBy } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

import { AreaChart, Area, XAxis, YAxis } from 'recharts';

import WeatherDot from './WeatherDot';
import TemperatureLabel from './TemperatureLabel';

const WeatherHourlyGraph = props => {
  const { hourly } = props;

  const hourlyData = map(hourly, temp => ({
    ...temp,
    time: moment(temp.time * 1000).format('ha'),
  }));
  const { temperature: dataMin } = minBy(hourlyData, 'temperature');
  const { temperature: dataMax } = maxBy(hourlyData, 'temperature');

  return (
    <div className='weather-hourly'>
      <AreaChart
        data={hourlyData}
        height={200}
        margin={{ top: 120, right: 20, left: 20, bottom: 0 }}
        width={700}
      >
        <XAxis
          axisLine={false}
          dataKey='time'
          fill='var(--light-grey)'
          fontSize='1em'
          tickLine={false}
        />
        <YAxis domain={[dataMin - 1, dataMax]} hide />
        <Area
          dataKey='temperature'
          dot={<WeatherDot />}
          fill='var(--light-grey)'
          label={<TemperatureLabel />}
          stroke='var(--medium-grey)'
          type='monotone'
        />
      </AreaChart>
    </div>
  );
};

export default WeatherHourlyGraph;

WeatherHourlyGraph.propTypes = {
  hourly: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number.isRequired,
      summary: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      temperature: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
