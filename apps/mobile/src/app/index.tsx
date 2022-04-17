import React from 'react';
import {store} from "./redux/store";
import {Provider} from "react-redux";
import App from "./App";
import LoginScreen from "./screens/login.screen";


export const Index = () => {
  return (
    <Provider store={store}>
      <App/>
    </Provider>);
}
