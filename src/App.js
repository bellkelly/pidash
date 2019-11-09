import React from 'react';

import Clock from './Components/Clock';
import Weather from './Components/Weather/Weather';

import './App.css';

const App = () => (
  <div className='App grid-container'>
    <Clock />
    <Weather />
  </div>
);

export default App;
