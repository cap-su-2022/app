import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGetAPICall, axiosPostAPICall } from '../../../api-call';
import { API_URL } from '../../../../constants/constant';
import { axiosPost } from '../../../../../../../frontend/utils/api';

export const checkOutBookingRoom = createAsyncThunk<
  any,
  string,
  {
    rejectValue: {
      message: string;
    };
  }
>('room-booking/check-out-booking-room', async (payload, thunkAPI) => {
  return await axiosPostAPICall(
    `${API_URL}/booking-room/check-out/${payload}`,
    undefined,
    thunkAPI
  );
});
