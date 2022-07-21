import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../spinner';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../../../constants/constant';

interface RequestPayload {
  date: string;
  checkinSlotId: string;
  checkoutSlotId: string;
}

interface Response {
  id: string;
  name: string;
  description: string;
  type: string;
}

interface RejectValue {
  message: string;
}

export const fetchRoomFreeByDayAndSlot = createAsyncThunk<
  Response[],
  RequestPayload,
  {
    rejectValue: RejectValue;
  }
>('room-booking/fetch-free-room', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.get(
      `${API_URL}/booking-room/list-room-free-at-time`,
      {
        params: {
          date: payload.date,
          checkinSlotId: payload.checkinSlotId,
          checkoutSlotId: payload.checkoutSlotId,
        },
      }
    );
    return await response.data;
  } catch (e: AxiosError | any) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
