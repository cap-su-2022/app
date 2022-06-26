import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';
import { PaginationResponse } from '../../../../models/pagination-response.payload';
import { RoomBooking } from '../../../../models/room-booking.model';
import { PaginationParams } from '../../../../models/pagination-params.model';

export const fetchRoomBookings = createAsyncThunk<
  PaginationResponse<RoomBooking>,
  PaginationParams,
  {
    rejectValue: {
      message: string;
    };
  }
>('room-booking/fetch-room-bookings', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.get('api/booking-room/search', {
      params: {
        limit: payload.limit,
        page: payload.page,
        roomName: payload.roomName,
        reasonType: payload.reasonType,
        checkInAt: payload.checkInAt,
        checkOutAt: payload.checkOutAt,
        sort: payload.sort,       
      },
    });
    console.log("DATA NE: ",response.data);
    return await response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
