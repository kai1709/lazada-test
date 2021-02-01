import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Categories from './containers/Categories'
import './App.scss';

const App = () => {
  return (
    <Router>
      <div>
      <Switch>
          <Route path="/">
            <Categories />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
