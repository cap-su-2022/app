import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';
import { Slot } from '../../../../models/slot.model';
import { PaginationParams } from '../../../../models/pagination-params.model';

export const fetchSlotNames = createAsyncThunk<
  Slot[],
  void,
  {
    rejectValue: {
      message: string;
    };
  }
>('slot/fetch-slot-names', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.get('api/slots/name');
    const result = await response.data.map((slot =>({
      value: slot.id,
      label: slot.name,
      slotNum: slot.slotNum
    })))
    return await result;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});