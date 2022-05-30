import {createAsyncThunk} from "@reduxjs/toolkit";
import {Device} from "../../../../models/device.model";
import axios from "axios";
import {Room} from "../../../../models/room.model";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";
import {RootState} from "../../../store";

interface FetchDevicesSuccessResponse {
  data: Device[],
  currentPage: number;
  totalPage: number;
  size: number;
}

interface RejectPayload {
  message: string;
}


export const fetchDevices = createAsyncThunk<FetchDevicesSuccessResponse, void, {
  rejectValue: RejectPayload
}>('device/fetch-devices', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  const state = thunkAPI.getState() as RootState;
  try {
    const response = await axios.post(`api/devices`, {
      search: state.room.textSearch,
      page: state.room.currentPage,
      size: state.room.size,
      sort: state.room.direction
    });

    return await response.data as FetchDevicesSuccessResponse;
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
