import { createAsyncThunk } from "@reduxjs/toolkit";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { API_URL } from "../../../../constants/constant";
import { toggleSpinnerOff, toggleSpinnerOn } from "../../spinner";
import axios from "axios";
import { persistGoogleIdToken } from "../../../userSlice";
import {LOCAL_STORAGE} from "../../../../utils/local-storage";

export const doGoogleLogin = createAsyncThunk("auth/google-login", async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true }); // <-- Add this
    const { idToken } = await GoogleSignin.signIn();
    const response = await axios.post(`${API_URL}/auth/signin/google`, { token: idToken});
    const data = await response.data;
    LOCAL_STORAGE.set('accessToken', response.headers['authorization']);
    LOCAL_STORAGE.set('refreshAccessToken', response.headers['authorizationrefreshtoken']);
    thunkAPI.dispatch(persistGoogleIdToken(idToken));

  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue({
      message: e.message
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());

  }
});
