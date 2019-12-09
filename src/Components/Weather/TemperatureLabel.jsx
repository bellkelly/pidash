import { round } from 'lodash';
import PropTypes from 'prop-types';
import React, { PureComponent }  from 'react';

class TemperatureLabel extends PureComponent {
  render() {
    const { value, ...rest } = this.props;
    return (
      <text dy={-35} fill='var(--light-grey)' textAnchor='middle' {...rest}>
        {round(value)}&deg;C
      </text>
    );
  }
};

export default TemperatureLabel;

TemperatureLabel.defaultProps = {
  value: 0,
};

TemperatureLabel.propTypes = {
  value: PropTypes.number,
};
