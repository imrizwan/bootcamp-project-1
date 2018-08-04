import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js/dist/popper.min.js'
import 'jquery/dist/jquery.slim.min.js'
import 'bootstrap';
import AppRoute from './Route/AppRoute';

class App extends Component {
  render() {
    return (
      <div>
        <AppRoute />
      </div>
    );
  }
}

export default App;
