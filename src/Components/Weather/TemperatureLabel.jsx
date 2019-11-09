import { round } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

const TemperatureLabel = props => {
  const { value, ...rest } = props;
  return (
    <text dy={-35} fill='var(--light-grey)' textAnchor='middle' {...rest}>
      {round(value)}&deg;C
    </text>
  );
};

export default TemperatureLabel;

TemperatureLabel.defaultProps = {
  value: 0,
};

TemperatureLabel.propTypes = {
  value: PropTypes.number,
};
