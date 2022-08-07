import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';
import dayjs from 'dayjs';

export const fetchRoomFreeAtMultiDay = createAsyncThunk<
  any[],
  {
    checkinDate: string,
    checkoutDate: string,
    checkinSlotId: string,
    checkoutSlotId: string,
  },
  {
    rejectValue: {
      message: string;
    };
  }
>('booking-room/list-room-free-at-multi-date', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.get('api/booking-room/list-room-free-at-multi-date-v2', {
      params: {
        dateStart: dayjs(payload.checkinDate).format("YYYY-MM-DD"),
        dateEnd: dayjs(payload.checkoutDate).format("YYYY-MM-DD"),
        checkinSlotId: payload.checkinSlotId,
        checkoutSlotId: payload.checkoutSlotId,
      },
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
