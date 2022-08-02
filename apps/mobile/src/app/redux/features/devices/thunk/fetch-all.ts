import { createAsyncThunk } from '@reduxjs/toolkit';
import { Device } from '../../../models/device.model';
import axios from 'axios';
import { API_URL } from '../../../../constants/constant';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import { axiosGetAPICall } from '../../../api-call';

interface RejectPayload {
  message: string;
}

export const fetchAllDevices = createAsyncThunk<
  Device[],
  {
    search: string;
    dir: string;
  },
  {
    rejectValue: RejectPayload;
  }
>('device/fetch-all', async (payload, thunkAPI) => {
  return await axiosGetAPICall(
    `${API_URL}/devices/name`,
    {
      search: payload.search,
      dir: payload.dir,
    },
    thunkAPI
  );
});
