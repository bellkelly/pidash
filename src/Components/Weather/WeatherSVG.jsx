import React from 'react';
import PropTypes from 'prop-types';

import WeatherIcons from '../../assets/WeatherIcons';

const WeatherSVG = props => {
  const { fill, height, icon, width, x, y } = props;
  return (
    <svg
      fill={fill}
      height={height}
      viewBox='0 0 32 32'
      width={width}
      x={x}
      y={y}
    >
      <path d={WeatherIcons[icon]} transform='translate(0 -1020.4)' />
    </svg>
  );
};

export default WeatherSVG;

WeatherSVG.defaultProps = {
  x: 0,
  y: 0,
  height: 24,
  width: 24,
  fill: 'var(--light-grey)',
};

WeatherSVG.propTypes = {
  fill: PropTypes.string,
  height: PropTypes.number,
  icon: PropTypes.string.isRequired,
  width: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
};
