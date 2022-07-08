import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";

export const deleteAccountById = createAsyncThunk('account/delete-by-id', async (id: string, thunkAPI) => {
  const {dispatch} = thunkAPI;

  dispatch(toggleSpinnerOn());
  return axios.delete(`/api/accounts/${id}`)
    .then((resp) =>  resp.data).finally(() =>  dispatch(toggleSpinnerOff()));
});
