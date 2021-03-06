import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import AuthReducer from './store/reducers/Auth';
import RecipesReducer from './store/reducers/Recipes';

const rootReducer = combineReducers({
  auth: AuthReducer,
  recipes: RecipesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {

  return (
    <Provider store={store}>
      <StatusBar />
      <AppNavigator />
    </Provider>
  )
}
