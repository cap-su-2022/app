import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../features/spinner';
import axios from 'axios';
import { PaginationResponse } from '../../../models/pagination-response.payload';
import { DeviceType } from '../../../models/device-type.model';
import { PaginationParams } from '../../../models/pagination-params.model';

export const fetchDeviceTypes = createAsyncThunk<
  PaginationResponse<DeviceType>,
  PaginationParams,
  {
    rejectValue: {
      message: string;
    };
  }
>('device-type', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.get('api/device-type', {
      params: {
        page: payload.page,
        limit: payload.limit,
        sort: payload.sort,
        dir: payload.dir,
        search: payload.search,
      },
    });
    return await response.data;
  } catch (e) {
    alert(e);
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
