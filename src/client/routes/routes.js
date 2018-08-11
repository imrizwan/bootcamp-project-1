import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "../comp/Dashboard";
import Home from "../comp/Home";
import SignIn from "../comp/SignIn";
import SignUp from "../comp/SignUp";
import Categories from "../comp/SubmitAd/Categories";
import Properties from "../comp/SubmitAd/Properties/Properties";
import ForSale from "../comp/SubmitAd/Properties/ForSale";
import NewProjects from "../comp/SubmitAd/Properties/NewProjects";
import ForRent from "../comp/SubmitAd/Properties/ForRent";

export default class AppRoute extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" component={Home} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/categories" component={Categories} />
          <Route path="/categories/properties/" component={Properties} />
          <Route path="/categories/properties/forrent" component={ForRent} />
          <Route path="/categories/properties/forsale" component={ForSale} />
          <Route path="/categories/properties/newprojects" component={NewProjects} />
        </div>
      </BrowserRouter>
    );
  }
}
