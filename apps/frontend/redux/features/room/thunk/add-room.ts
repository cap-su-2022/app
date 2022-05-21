import {createAsyncThunk} from "@reduxjs/toolkit";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";
import axios from "axios";

interface AddRoomPayload {
  name: string;
  description: string;
  isDisabled: boolean;
}

interface AddRoomRejectValue {
  message: string;
}

export const addRoom = createAsyncThunk<void, AddRoomPayload, {
  rejectValue: AddRoomRejectValue
}>('room/add-room', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());

  try {
    const response = await axios.post(`/api/rooms/add`, payload);
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
