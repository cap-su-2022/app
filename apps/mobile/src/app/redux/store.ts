import { Action, AnyAction, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { spinnerReducer } from "./features/spinner";
import { feedbackSearchFilterReducer } from "./features/feedback-search-filter";
import { roomBookingReducer } from "./features/room-booking/slice";
import { deviceReducer } from "./features/devices/slice";
import { authReducer } from "./features/auth/slice";
import { accountReducer } from "./features/account/slice";
import {roomReducer} from "./features/room/slice";
import {slotReducer} from "./features/slot";
import {bookingReasonReducer} from "./features/booking-reason/slice";
import {bookedRequestReducer} from "./features/room-booking-v2/slice";

const combinedReducer = combineReducers({
  user: userReducer,
  spinner: spinnerReducer,
  feedbackSearchFilter: feedbackSearchFilterReducer,
  roomBooking: roomBookingReducer,
  device: deviceReducer,
  auth: authReducer,
  account: accountReducer,
  room: roomReducer,
  slot: slotReducer,
  bookingReason: bookingReasonReducer,
  bookedRequest: bookedRequestReducer
});
const reducer = (state: ReturnType<typeof combinedReducer>, action: AnyAction) => {

  return combinedReducer(state, action);
};

export const makeStore = () => {
  return configureStore({
    reducer: reducer
  });
};

export type RootState = ReturnType<typeof combinedReducer>;
type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
