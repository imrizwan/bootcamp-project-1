import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import Dashboard from "../comp/Dashboard";
import Home from "../comp/Home";
import SignIn from "../comp/SignIn";
import SignUp from "../comp/SignUp";
import Categories from "../comp/SubmitAd/Categories";
import Properties from "../comp/SubmitAd/Properties/Properties";
import ForSale from "../comp/SubmitAd/Properties/ForSale";
import NewProjects from "../comp/SubmitAd/Properties/NewProjects";
import ForRent from "../comp/SubmitAd/Properties/ForRent";

//AdView
import PropertiesView from "../comp/AdView/Properties/Properties";
import PropertiesViewTemp from "../comp/AdView/Properties/PropertiesViewTemp";
import ForSaleView from "../comp/AdView/Properties/ForSale";
import NewProjectsView from "../comp/AdView/Properties/NewProjects";
import ForRentView from "../comp/AdView/Properties/ForRent";

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
          <Route path="/categories" component={Categories} />
          <Route path="/categories/properties/" component={Properties} />
          <Route path="/categories/properties/forrent" component={ForRent} />
          <Route path="/categories/properties/forsale" component={ForSale} />
          <Route path="/categories/properties/newprojects" component={NewProjects} />

          {/* AdView */}
          <Route path="/dashboard/properties/" component={PropertiesView} />
          <Route path="/dashboard/properties/forrent" component={ForRentView} />
          <Route path="/dashboard/properties/forsale" component={ForSaleView} />
          <Route path="/dashboard/properties/newprojects" component={NewProjectsView} />
          <Route path="/dashboard/properties/:id" component={PropertiesViewTemp} />
        </div>
      </Router>
    );
  }
}
