import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match } from 'react-router';
import Demo from './Demo';
import './App.css';

ReactDOM.render(
  (
  <BrowserRouter>
    <div>
      <Match exactly pattern="/" component={Demo}/>
      <Match pattern="/callback" component={Demo}/>
    </div>
  </BrowserRouter>

),
  document.getElementById('root')
);
