import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Auth from './containers/Auth';
import Login from './containers/Login';
import Top from './containers/Top';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Auth>
        <Switch>
          <Route path="/" component={Top} />
        </Switch>
      </Auth>
    </Switch>
  </Router>
);

export default App;
