import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import logger from 'redux-logger';
import spinnerSlice from './features/spinner/slice';
import { authReducer } from './features/user/auth.slice';
import { roomReducer } from './features/room/room.slice';
import { roomBookingReducer } from './features/room-booking/room-booking.slice';
import { systemReducer } from './features/system/system.slice';
import { devicesReducer } from './features/devices/devices.slice';
import { usersReducer } from './features/user/user.slice';
import { roomTypeReducer } from './features/room-type';
import { deviceTypeReducer } from './features/device-type';
import { roleReducer } from './features/role/role.slice';
import { bookingReasonReducer } from './features/booking-reason/booking-reason.slice';

const isProduction = process.env.NODE_ENV === 'production';

const combinedReducer = combineReducers({
  spinner: spinnerSlice.reducer,
  auth: authReducer,
  room: roomReducer,
  device: devicesReducer,
  roomBooking: roomBookingReducer,
  system: systemReducer,
  user: usersReducer,
  roomType: roomTypeReducer,
  deviceType: deviceTypeReducer,
  role: roleReducer,
  bookingReason: bookingReasonReducer,
});

const reducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    return {
      ...state, //use previous state
      ...action.payload, //apply delta from hydration
    };
  } else {
    return combinedReducer(state, action);
  }
};

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
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper(makeStore, { debug: !isProduction });
