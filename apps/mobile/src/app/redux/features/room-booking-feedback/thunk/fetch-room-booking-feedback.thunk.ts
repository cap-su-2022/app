import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGetAPICall } from '../../../api-call';
import { API_URL } from '../../../../constants/constant';

export const fetchRoomBookingFeedback = createAsyncThunk<
  any,
  string,
  {
    rejectValue: {
      message: string;
    };
  }
>('room-booking-feedback', async (payload, thunkAPI) => {
  return await axiosGetAPICall(
    `${API_URL}/room-booking-feedbacks/${payload}`,
    undefined,
    thunkAPI
  );
});
