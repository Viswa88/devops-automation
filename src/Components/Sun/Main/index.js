import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Overview from '../Overview';
import Sections from '../Sections';

class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/sun/overview" component={Overview} />
        <Route path="/sun/overview?:id" component={Overview} />
        <Route path="/sun/sections" component={Sections} />
      </div>
    );
  }
}

export default Main;
