import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Sun from './Components/Sun/Main';
import './App.css';
class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to="/sun/overview" />}
          />
          <Route path="/sun" component={Sun} />
        </Switch>
      </main>
    );
  }
}

export default App;
