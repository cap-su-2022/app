import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';
import dayjs from 'dayjs';

interface AddRequestPayload {
  roomId: string;
  checkinDate: string;
  checkinSlot: string;
  checkoutSlot: string;
  description: string;
  bookingReasonId: string;
  bookedFor: string;
  listDevice: any[];
}

interface AddRequestRejectValue {
  message: string;
}

export const addNewRequest = createAsyncThunk<
  void,
  AddRequestPayload,
  {
    rejectValue: AddRequestRejectValue;
  }
>('booking-room/new-request', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());

  try {
    const response = await axios.post(`/api/booking-room/new-request`, {
      roomId: payload.roomId,
      checkinDate: dayjs(payload.checkinDate).format('YYYY-MM-DD'),
      checkinSlot: payload.checkinSlot,
      checkoutSlot: payload.checkoutSlot,
      description: payload.description,
      bookingReasonId: payload.bookingReasonId,
      bookedFor: payload.bookedFor,
      listDevice: payload.listDevice,
    });
    return await response.data;
  } catch (e) {
    if (e.response.status === 401 || e.response.status === 403) {
      return thunkAPI.rejectWithValue({
        message: 'Access token is invalid',
      });
    } else {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
      });
    }
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
