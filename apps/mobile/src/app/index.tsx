import "react-native-gesture-handler";

import React from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import App from "./App";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export const Index = () => {
  return (

    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
      </GestureHandlerRootView>
    </Provider>);
}
