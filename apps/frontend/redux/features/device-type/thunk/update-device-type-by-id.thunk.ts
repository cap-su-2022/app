import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';
import { defaultPaginationParams } from '../../../../models/pagination-params.model';
import { fetchDeviceTypes } from './fetch-device-types.thunk';

export const updateDeviceTypeById = createAsyncThunk<
  void,
  {
    id?: string;
    name?: string;
    description?: string;
  },
  {
    rejectValue: {
      message: string;
    };
  }
>('device-type/update-by-id', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.put(`api/device-type/${payload.id}`, {
      id: payload.id,
      name: payload.name,
      description: payload.description,
    });
    return await response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
    thunkAPI.dispatch(fetchDeviceTypes(defaultPaginationParams));
  }
});
