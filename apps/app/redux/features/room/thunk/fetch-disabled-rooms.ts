import {createAsyncThunk} from "@reduxjs/toolkit";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";
import axios from "axios";
import {Room} from "../../../../models/room.model";

interface DisabledRoomRejectValue {
  message: string;
}

export const fetchDisabledRooms = createAsyncThunk<Room[], void, {
  rejectValue: DisabledRoomRejectValue
}>('rooms/fetch-disabled-rooms', async (any, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());

  try {
    const response = await axios.get(`/api/rooms/disabled`);
    return await response.data;
  } catch ({response}) {
    if (response.status === 401 || response.status === 403) {
      return thunkAPI.rejectWithValue({
        message: 'Access token is invalid'
      })
    }
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
