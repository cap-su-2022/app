import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';

export const fetchReasonNames = createAsyncThunk<
any[],
void,
{
  rejectValue: {
    message: string;
  };
}
>('booking-reason/fetch-booking-reason-names', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.get('api/booking-reasons/name');
    const result = await response.data.map(reason => ({
      value: reason.id,
      label: reason.name
    }))
    return await result;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});



