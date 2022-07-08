import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";

export const restoreDeletedDevice = createAsyncThunk<any, any, {
  rejectValue: {
    message: string
  }
}>('room/restore-deleted-room', async (id: string, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.put(`/api/devices/restore-deleted/${id}`);
    return await response.data;
  } catch ({response}) {
    return thunkAPI.rejectWithValue({
      message: 'Access token is invalid',
    })
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
