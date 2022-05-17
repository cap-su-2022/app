import {createAsyncThunk} from "@reduxjs/toolkit";
import axios, {AxiosResponse} from "axios";
import {API_URL, axiosPost} from "../../../utils/api";
import {UserLoginSuccessModel} from "../../../models/user/user-login-success-response.model";



export const doLogin = createAsyncThunk<UserLoginSuccessModel, UserCredentials, {
  rejectValue: LoginErrorThunk,
}>("user/login", async (credentials: UserCredentials, thunkApi) => {
  try {
    const response = await axios.post(API_URL.user.login, {
      username: credentials.username,
      password: credentials.password
    });
    const data = await response.data;
    console.log(data);
    return data;
  } catch (e) {
    return thunkApi.rejectWithValue({
      message: e.response.data?.message ?? 'Internal Server Error',
    })
  }

});

interface LoginErrorThunk {
  message: string
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserLoginFailedModel {
  statusCode: number;
  message: string;
}



