import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosError, AxiosResponse} from "axios";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";
import {Room} from "../../../../models/room.model";
import {RootState} from "../../../store";

interface FetchRoomsSuccessResponse {
  data: Room[],
  currentPage: number;
  totalPage: number;
  size: number;
}

interface FetchRoomsRejectPayload {
  message: string;
}

export const fetchRooms = createAsyncThunk<FetchRoomsSuccessResponse, void, {
  rejectValue: FetchRoomsRejectPayload
}>('room/fetch-rooms', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  const state = thunkAPI.getState() as RootState;
  try {
    const response = await axios.post(`api/rooms`, {
      search: state.room.textSearch,
      page: state.room.currentPage,
      size: state.room.size,
      sort: state.room.direction
    });

    return await response.data as FetchRoomsSuccessResponse;
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
