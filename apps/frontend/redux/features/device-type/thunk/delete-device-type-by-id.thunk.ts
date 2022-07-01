import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';

export const deleteDeviceTypeById = createAsyncThunk<
  void,
  string,
  {
    rejectValue: {
      message: string;
    };
  }
>('device-type/delete-by-id', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.delete(`api/device-type/${payload}`);
    return await response.data;
  } catch ({response}) {
    if (response.status === 401 || response.status === 403) {
      return thunkAPI.rejectWithValue({
        message: 'Access token is invalid'
      })
    }
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
