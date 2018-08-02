import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import submitAdReducer from '../reducers/submitAd';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;



    export default () => {
        const store = createStore(combineReducers({
        submitAd: submitAdReducer,
    }),
    composeEnhancers(
        applyMiddleware(thunk),
        // other store enhancers if any
      )
    );
    return store;
    }