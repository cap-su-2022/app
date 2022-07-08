import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";

export const disableAccountById = createAsyncThunk('account/disable-by-id', async (id: string, thunkAPI) => {
  const {dispatch} = thunkAPI;

  dispatch(toggleSpinnerOn());
  return axios.put(`/api/accounts/disable/${id}`)
    .then((resp) => {
      return;
    }).finally(() =>  dispatch(toggleSpinnerOff()));
});
