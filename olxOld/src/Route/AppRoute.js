import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from '../components/Home';
import Categories from '../components/submitAd/Categories';
import ForRent from '../components/submitAd/Properties/ForRent';
import ForSale from '../components/submitAd/Properties/ForSale';
import NewProjects from '../components/submitAd/Properties/NewProjects';
import Properties from '../components/submitAd/Properties/Properties';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

export default class AppRoute extends React.Component {
    render(){
        return(
            <BrowserRouter>
                <div>
                <Route exact={true} path="/" component={Home} />
                <Route path="/categories" component={Categories} />
                <Route path="/categories/Properties" component={Properties} />
                <Route path="/categories/Properties/ForRent" component={ForRent} />
                <Route path="/categories/Properties/ForSale" component={ForSale} />
                <Route path="/categories/Properties/NewProjects" component={NewProjects} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                </div>
            </BrowserRouter>
        )
    }
}