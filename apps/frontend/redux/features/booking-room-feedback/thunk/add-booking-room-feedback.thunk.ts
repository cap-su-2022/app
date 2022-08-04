import {createAsyncThunk} from '@reduxjs/toolkit';
import {toggleSpinnerOff, toggleSpinnerOn} from '../../spinner';
import axios from 'axios';
import {defaultPaginationParams} from '../../../../models/pagination-params.model';
import {fetchBookingRoomFeedback} from "./fetch-booking-room-feedbacks.thunk";


export const addBookingRoomFeedback = createAsyncThunk<void,
  {
    name?: string;
    description?: string;
  },
  {
    rejectValue: {
      message: string;
    };
  }>('booking-room-feedback/add', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.post(`api/booking-room-feedback`, {
      name: payload.name,
      description: payload.description,
    });
    return await response.data;
  } catch (e) {
    if (e.response.data.message.includes('duplicate')) {
      return thunkAPI.rejectWithValue({
        message:
          'There already exists a booking room feedback with the this name. Try with another name.',
      });
    } else if (e.response.status === 401 || e.response.status === 403) {
      return thunkAPI.rejectWithValue({
        message: 'Access token is invalid',
      });
    }
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
    thunkAPI.dispatch(fetchBookingRoomFeedback(defaultPaginationParams));
  }
});
