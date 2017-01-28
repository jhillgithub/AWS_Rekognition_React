import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Main from '../pages/Main'
import Welcome from '../pages/welcome_page/Welcome'
import Settings from '../pages/settings_page/Settings'
import Admin from '../pages/admin_page/AdminPage'

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Welcome} />
      <Route path="settings" component={Settings}/>
      <Route path="admin" component={Admin}/>
    </Route>
  </Router>
);
