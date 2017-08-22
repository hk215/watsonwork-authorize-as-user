import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Demo from './Demo';
import './App.css';

ReactDOM.render(
  (
  <Router>
    <Switch>
      <Route exact path="/" component={Demo}/>
      <Route path="/callback" component={Demo}/>
    </Switch>
  </Router>

),
  document.getElementById('root')
);
