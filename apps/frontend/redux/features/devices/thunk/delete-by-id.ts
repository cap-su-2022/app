import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";

export const deleteDeviceById = createAsyncThunk('device/delete-by-id', async (id: string, thunkAPI) => {
  const {dispatch} = thunkAPI;

  dispatch(toggleSpinnerOn());
  return axios.delete(`/api/devices/${id}`)
    .then((resp) =>  resp.data).finally(() =>  dispatch(toggleSpinnerOff()));
});
