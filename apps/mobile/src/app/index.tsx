import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { makeStore } from "./redux/store";

export const Index = () => {
  return (
    <Provider store={makeStore()}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <App />
      </GestureHandlerRootView>
    </Provider>);
}
