import { createAsyncThunk } from '@reduxjs/toolkit';
import { Device } from '../../../models/device.model';
import axios from 'axios';
import { API_URL } from '../../../../constants/constant';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';

interface RejectPayload {
  message: string;
}

export const fetchAllDevices = createAsyncThunk<
  Device[],
  void,
  {
    rejectValue: RejectPayload;
  }
>('device/fetch-all', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.post(`${API_URL}/devices`);
    return await response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
