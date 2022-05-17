import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {AppThunk, RootState} from "../../../store";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";

export const getRoomById = createAsyncThunk('room/get-room-by-id',  async (id: string, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());

  const response = await axios.get(`/api/rooms/${id}`);

  const state = thunkAPI.getState() as RootState;


  const data = await response.data;
  console.log(data);
  thunkAPI.dispatch(toggleSpinnerOff());

  return data;
});
