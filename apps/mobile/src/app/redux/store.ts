import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import {spinnerReducer} from "./features/spinner";
import {feedbackSearchFilterReducer} from "./features/feedback-search-filter";
import { roomBookingReducer } from "./features/room-booking/slice";
import { makeStore } from "../../../../frontend/redux/store";
import { deviceReducer } from "./features/devices/slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    spinner: spinnerReducer,
    feedbackSearchFilter: feedbackSearchFilterReducer,
    roomBooking: roomBookingReducer,
    device: deviceReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
