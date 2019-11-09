import { get } from 'axios';
import { slice, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import WeatherCurrent from './WeatherCurrent';
import WeatherDaily from './WeatherDaily';
import WeatherHourlyGraph from './WeatherHourlyGraph';

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isError: false,
      alerts: [],
      currently: {},
      hourly: {},
      daily: {},
    };

    this.getCurrentWeather = this.getCurrentWeather.bind(this);
  }

  componentDidMount() {
    this.getCurrentWeather();

    this.timer = setInterval(this.getCurrentWeather, 1000 * 60 * 3);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  getCurrentWeather() {
    get('weather/43.653225,-79.383186/?units=si')
      .then(res => {
        const { currently, daily, hourly } = res.data;

        this.setState({
          currently,
          hourly,
          daily,
          isError: false,
          isLoading: false,
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ isError: true });
      });
  }

  render() {
    const { className } = this.props;
    const { alerts, currently, daily, hourly, isError, isLoading } = this.state;

    const alert = (!isEmpty(alerts) && alerts[0]) || {};

    return (
      (!isLoading && !isError && (
        <div className={classNames(className, 'weather')}>
          <WeatherCurrent alert={alert} currently={currently} />
          <WeatherHourlyGraph hourly={slice(hourly.data, 0, 9)} />
          <WeatherDaily days={slice(daily.data, 1, 8)} />
        </div>
      )) || <div className={classNames(className, 'weather')} />
    );
  }
}

export default Weather;

Weather.defaultProps = {
  className: 'bottom-center',
};

Weather.propTypes = {
  className: PropTypes.string,
};
