import { BadRequestException } from '@nestjs/common';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';
import dayjs from 'dayjs';

interface AddPayload {
  name: string;
  slotNum: number;
  timeStart: Date;
  timeEnd: Date;
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
    payload.slotNum = Number(payload.slotNum);
    const response = await axios.post(`/api/slots`, {
      ...payload,
      timeStart: dayjs(payload.timeStart).format('HH:mm:ss'),
      timeEnd: dayjs(payload.timeEnd).format('HH:mm:ss'),
    });
    return await response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
