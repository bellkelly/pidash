import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function Clock(props) {
  const [time, setTime] = useState(moment());
  const { className } = props;

  // Refresh time every 15 seconds
  setInterval(() => setTime(moment()), 1000 * 15);

  return (
    <div className={classNames(className, 'clock')}>
      <div className='clock-date'>{time.format('dddd, MMMM D')}</div>
      <div className='clock-time'>{time.format('h:mm A')}</div>
    </div>
  );
}

export default Clock;

Clock.defaultProps = {
  className: 'top-center',
};

Clock.propTypes = {
  className: PropTypes.string,
};
