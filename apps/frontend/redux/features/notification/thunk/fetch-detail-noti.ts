import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';
import { Notification } from '../../../../models/notification.model';

export const fetchDetailNotification = createAsyncThunk<
  Notification,
  string,
  {
    rejectValue: {
      message: string;
    };
  }
>('notifications/fetch-by-id', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.get(`api/notifications/${payload}`);
    return await response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
