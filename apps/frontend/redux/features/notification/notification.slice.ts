import { createSlice } from '@reduxjs/toolkit';
import { fetchNotifications } from './thunk/fetch-notification';
import { Notification } from '../../../models/notification.model';

interface InitialState {
  notifications: Notification[];
  notification: Notification;
}

const initialState: InitialState = {
  notifications: [],
  notification: {} as Notification,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, { payload }) => {
      state.notifications = payload;
    });
  },
});

export const notificationReducer = notificationSlice.reducer;
