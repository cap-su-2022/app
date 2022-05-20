import {UserLoginSuccessModel} from "../../../models/user/user-login-success-response.model";
import {createSlice} from "@reduxjs/toolkit";
import {doLogin} from "./login.thunk";
import {doValidateAccessToken} from "./validate-token.thunk";

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
  userLoginResponse: undefined,
}

export const authSlice = createSlice({
  initialState: initialState,
  name: 'auth',
  reducers: {
    resetLoginFailedStatus(state) {
      state.isLoginFailed = false;
    },
    invalidateAuthUser(state) {
      state.userLoginResponse = undefined;
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
    builder.addCase(doLogin.rejected, (state, thunk) => {
      state.isLoginFailed = true;
      state.error = thunk.payload.message;
      state.isLoading = false;
    });
    builder.addCase(doValidateAccessToken.fulfilled, (state, {payload}) => {

    });
    builder.addCase(doValidateAccessToken.rejected, (state, {payload}) => {
      state.userLoginResponse = undefined;

    });
  }
});


export const authReducer = authSlice.reducer;
export const {resetLoginFailedStatus, invalidateAuthUser} = authSlice.actions;
