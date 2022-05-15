import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import {spinnerReducer} from "./features/spinner";
import {feedbackSearchFilterReducer} from "./features/feedback-search-filter";

export const store = configureStore({
  reducer: {
    user: userReducer,
    spinner: spinnerReducer,
    feedbackSearchFilter: feedbackSearchFilterReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
