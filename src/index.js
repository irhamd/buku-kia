import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import './ /bootstrap.min.css';
import './assets/css/bootstrap/bootstrap.min.css'
// import "./assets/css/toastr/toastr.css";
import "./assets/css/toastr/toastr.css"
// import 'sweetalert2/src/sweetalert2.scss'
// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import "assets/css/material-dashboard-react.css?v=1.10.0";
import "assets/css/antd/dist/antd.css";
import "assets/css/style.css";
 
import "./App.less"
import AttemptLogin from "components/Auth/AttemptLogin";
import ProtectedRoute from "services/Route/ProtectedRoute";
import moment from "moment";
// import ProtectedRoute from "services/Route/ProtectedRoute";

var idLocale = require('moment/locale/id');
moment.locale('id', idLocale);


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route
        path="/login"
        component={AttemptLogin}
      />
      <ProtectedRoute path="/admin" component={Admin} />
      <Redirect from="/material-dashboard-react" to="/login" />
      <Redirect from="/" to="/login" />
      <Redirect from="/admin" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
