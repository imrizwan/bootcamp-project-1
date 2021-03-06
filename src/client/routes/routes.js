import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import Dashboard from "../comp/Dashboard";
import Message from "../comp/Message";
import AllMessages from "../comp/AllMessages";
import EditAd from "../comp/EditAd";
import Home from "../comp/Home";
import SignIn from "../comp/SignIn";
import SignUp from "../comp/SignUp";
import Categories from "../comp/SubmitAd/Categories";
import Properties from "../comp/SubmitAd/Properties/Properties";
import PropertiesView from "../comp/SubmitAd/Properties/PropertiesView";
import ForSale from "../comp/SubmitAd/Properties/ForSale";
import NewProjects from "../comp/SubmitAd/Properties/NewProjects";
import ForRent from "../comp/SubmitAd/Properties/ForRent";
export const history = createHistory();

export default class AppRoute extends React.Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/message/:id" component={Message} />
          <Route path="/messages/" component={AllMessages} />
          <Route path="/edit/:id" component={EditAd} />
          <Route path="/categories" component={Categories} />
          <Route path="/categories/properties/" component={Properties} />
          <Route path="/categories/properties/forrent" component={ForRent} />
          <Route path="/categories/properties/forsale" component={ForSale} />
          <Route path="/categories/properties/newprojects" component={NewProjects} />
          <Route path="/view/:id" component={PropertiesView} />
        </div>
      </Router>
    );
  }
}
