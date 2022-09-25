import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGetAPICall } from '../../../api-call';
import { API_URL } from '../../../../constants/constant';
import { HolidaysResponse } from '../../../models/fetch-holidays-response.model';

export const fetchHolidays = createAsyncThunk<
  HolidaysResponse[],
  void,
  {
    rejectValue: {
      message: string;
    };
  }
>('holiday/fetch-holidays', async (payload, thunkAPI) => {
  return await axiosGetAPICall(`${API_URL}/holidays`, undefined, thunkAPI);
});
