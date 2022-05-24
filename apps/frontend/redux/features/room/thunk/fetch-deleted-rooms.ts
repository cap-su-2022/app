import {createAsyncThunk} from "@reduxjs/toolkit";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";
import axios from "axios";
import {Room} from "../../../../models/room.model";

interface DeletedRoomRejectValueModel {
  message: string;
}

export const fetchDeletedRooms = createAsyncThunk<Room[], void, {
  rejectValue: DeletedRoomRejectValueModel
}>('rooms/fetch-deleted-rooms', async (any, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());

  try {
    const response = await axios.get(`/api/rooms/deleted`);
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
