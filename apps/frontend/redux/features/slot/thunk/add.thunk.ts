import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';

interface AddPayload {
  name: string;
  slotNum: number;
  description: string;
}

interface RejectValue {
  message: string;
}

export const addSlot = createAsyncThunk<
  void,
  AddPayload,
  {
    rejectValue: RejectValue;
  }
>('slot/add-slot', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());

  try {
    const response = await axios.post(`/api/slots`, payload);
    return await response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
