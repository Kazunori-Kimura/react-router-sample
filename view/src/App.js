import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from 'react-router-dom';

import Auth from './containers/Auth';
import Login from './containers/Login';
import Layout from './containers/layouts/Layout';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Auth>
        <Route path="/" component={Layout} />
      </Auth>
    </Switch>
  </Router>
);

export default App;
