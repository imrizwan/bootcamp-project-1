import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'popper.js/dist/popper.min.js'
import 'jquery/dist/jquery.slim.min.js'
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

const jsx = (<Provider store={store}><App /></Provider>);

ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();