import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';
import dayjs from 'dayjs';

export const fetchRoomFreeAtTime = createAsyncThunk<
  any[],
  {
    date: string,
    checkinSlotId: string,
    checkoutSlotId: string,
  },
  {
    rejectValue: {
      message: string;
    };
  }
>('booking-room/list-room-free-at-time', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.get('api/booking-room/list-room-free-at-time', {
      params: {
        date: dayjs(payload.date).format("YYYY-MM-DD"),
        checkinSlotId: payload.checkinSlotId,
        checkoutSlotId: payload.checkoutSlotId,
      },
    });
    console.log("DATA NÈ: ", response.data)
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
