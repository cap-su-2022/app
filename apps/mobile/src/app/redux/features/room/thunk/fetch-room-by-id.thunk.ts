import {createAsyncThunk} from "@reduxjs/toolkit";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";
import axios from "axios";
import { API_URL } from "apps/mobile/src/app/constants/constant";
import {Room} from "../../../../../../../frontend/models/room.model";

interface RequestPayload {
  roomId: string;
}


export const fetchRoomById = createAsyncThunk<Room, RequestPayload, {
  rejectValue: {
    message: string
  }
}>('room/fetch-by-id', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());

  try {
    const response = await axios.get(`${API_URL}/rooms/find/${payload.roomId}`);
    return await response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.message,
    })
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
