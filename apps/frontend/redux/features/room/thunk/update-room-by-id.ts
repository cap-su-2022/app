import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {Room} from "../../../../models/room.model";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";

interface UpdateRoomPayload {
  id: string;
  payload: Room;
}

interface UpdateRoomRejectValue {
  message: string;
}

export const updateRoomById = createAsyncThunk<any, UpdateRoomPayload, {
  rejectValue: UpdateRoomRejectValue
}>('room/update-by-id', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.put(`/api/rooms/update/${payload.id}`, payload.payload);
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
