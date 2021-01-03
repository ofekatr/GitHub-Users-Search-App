import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import HomePage from "../../pages/HomePage/HomePage";
import SearchPage from "../../pages/SearchPage/SearchPage";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/search" component={SearchPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
