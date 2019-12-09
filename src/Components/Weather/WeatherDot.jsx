import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

import WeatherSVG from './WeatherSVG';

class WeatherDot extends PureComponent {
  render() {
    const {
      cx,
      cy,
      payload: { icon },
    } = this.props;

    return <WeatherSVG icon={icon} x={cx - 14} y={cy - 30} />;
  }
};

export default WeatherDot;

WeatherDot.defaultProps = {
  cx: 0,
  cy: 0,
  payload: {
    icon: 'clear-day',
  },
};

WeatherDot.propTypes = {
  cx: PropTypes.number,
  cy: PropTypes.number,
  payload: PropTypes.shape({
    icon: PropTypes.string.isRequired,
  }),
};
