import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import SearchPage from "../../pages/SearchPage/SearchPage";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SearchPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
