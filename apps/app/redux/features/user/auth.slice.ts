import {UserLoginSuccessModel} from "../../../models/user/user-login-success-response.model";
import {createSlice} from "@reduxjs/toolkit";
import {doLogin} from "./login.thunk";

type AuthState = {
  isLoading: boolean;
  isLoginFailed: boolean;
  error: string | null;
  userLoginResponse: UserLoginSuccessModel;
}

const initialState: AuthState = {
  isLoading: false,
  isLoginFailed: false,
  error: null,
  userLoginResponse: {} as UserLoginSuccessModel,
}

export const authSlice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {
    resetLoginFailedStatus(state) {
      state.isLoginFailed = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(doLogin.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(doLogin.fulfilled, (state, thunk) => {
      state.userLoginResponse = thunk.payload;
      state.isLoading = false;
    })
    builder.addCase(doLogin.rejected, (state, {payload}) => {
      state.isLoginFailed = true;
      state.error = payload.message;
      state.isLoading = false;
    });
  }
});


export const authReducer = authSlice.reducer;
export const {resetLoginFailedStatus} = authSlice.actions;
