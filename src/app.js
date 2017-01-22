import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

registerScreens(store, Provider);

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'Search',
      screen: 'reci.MainScreen',
      title: 'Search'
    },
  ]
});
