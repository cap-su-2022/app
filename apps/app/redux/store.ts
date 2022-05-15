import {Action, AnyAction, combineReducers, configureStore, ThunkAction} from "@reduxjs/toolkit";
import {createWrapper, HYDRATE} from "next-redux-wrapper";
import logger from 'redux-logger';
import spinnerSlice from "./features/spinner/slice";

const isProduction = process.env.NODE_ENV === "production";

const combinedReducer = combineReducers({
  spinner: spinnerSlice.reducer,
});

const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state, //use previous state
      ...action.payload, //apply delta from hydration
    };
  } else {
    return combinedReducer(state, action);
  }
}

export const makeStore = () => {
  return configureStore({
    reducer,
    devTools: !isProduction,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  });
};

type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<typeof combinedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;

export const wrapper = createWrapper(makeStore, {debug: !isProduction});
