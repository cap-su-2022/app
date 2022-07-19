import { createAsyncThunk } from '@reduxjs/toolkit';
import { Slot } from '../../../models/slot.model';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import { axiosGetAPICall } from '../../../api-call';
import { API_URL } from '../../../../constants/constant';

export const fetchAllSlots = createAsyncThunk<Slot[], void>(
  'slot/fetch-all-slots',
  async (payload, thunkAPI) => {
    return axiosGetAPICall(`${API_URL}/slots`, undefined, thunkAPI);
  }
);
