import axios, {AxiosError} from "axios";
import {LOCAL_STORAGE} from "../utils/local-storage";
import {ThunkApiMetaConfig} from "@reduxjs/toolkit/dist/query/core/buildThunks";
import {BaseThunkAPI} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {toggleSpinnerOff, toggleSpinnerOn} from "./features/spinner";

export const axiosGetAPICall = async (url, params, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());

  try {
    const response = await axios.get(url, {
      params: params,
      headers: {
        Authorization: LOCAL_STORAGE.getString('accessToken')
      }
    });
    return await response.data;
  } catch (e: AxiosError | any) {
    return thunkAPI.rejectWithValue({
      message: e.response.data.message,
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
}