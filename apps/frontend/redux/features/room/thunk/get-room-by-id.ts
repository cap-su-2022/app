import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";

export const getRoomById = createAsyncThunk('room/get-room-by-id',  async (id: string, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  const response = await axios.get(`/api/rooms/find/${id}`);
  const data = await response.data;
  thunkAPI.dispatch(toggleSpinnerOff());

  return data;
});
