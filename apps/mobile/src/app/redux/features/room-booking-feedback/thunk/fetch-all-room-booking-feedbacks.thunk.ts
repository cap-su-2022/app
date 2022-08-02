import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGetAPICall } from '../../../api-call';
import { API_URL } from '../../../../constants/constant';
import { RoomBookingFeedback } from '../../../models/room-booking-feedback.model';

interface RequestPayload {
  star: number[];
  roomId: string;
  feedbackTypeId: string;
}

export const fetchRoomBookingFeedbacks = createAsyncThunk<
  RoomBookingFeedback[],
  RequestPayload,
  {
    rejectValue: {
      message: string;
    };
  }
>('room-booking-feedback', async (payload, thunkAPI) => {
  return await axiosGetAPICall(
    `${API_URL}/room-booking-feedbacks/`,
    undefined,
    thunkAPI
  );
});
