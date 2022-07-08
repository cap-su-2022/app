import {createAsyncThunk} from "@reduxjs/toolkit";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";
import axios from "axios";

interface AddPayload {
  name: string;
  description: string;
  isDisabled: boolean;
}

interface RejectValue {
  message: string;
}

export const addDevice = createAsyncThunk<void, AddPayload, {
  rejectValue: RejectValue
}>('device/add-device', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());

  try {
    const response = await axios.post(`/api/devices/add`, payload);
    return await response.data;
  } catch ({response}) {
    if (response.status === 401 || response.status === 403) {
      return thunkAPI.rejectWithValue({
        message: 'Access token is invalid',
      });
    }
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
