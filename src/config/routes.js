import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import Main from '../pages/Main'
import WelcomePage from '../pages/welcome_page/WelcomePage'
import UploadPage from '../pages/upload_page/UploadPage'
import AdminPage from '../pages/admin_page/AdminPage'
import HuePage from '../pages/hue_page/HuePage'
import WebcamPage from '../pages/webcam_page/WebcamPage'

module.exports = (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={WelcomePage} />
      <Route path="upload" component={UploadPage}/>
      <Route path="admin" component={AdminPage}/>
      <Route path="hue" component={HuePage}/>
      <Route path="webcam" component={WebcamPage}/>
    </Route>
  </Router>
);
