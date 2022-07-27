import { createSlice } from '@reduxjs/toolkit';
import { AuthUser } from '../../models/auth-user.model';
import { doLogin } from './thunk/login.thunk';
import { validateAccessToken } from './thunk/validate-access-token.thunk';
import { doGoogleLogin } from './thunk/google-login.thunk';

interface AuthState {
  authUser: AuthUser;
}

const initialState: AuthState = {
  authUser: {} as AuthUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(doLogin.fulfilled, (state, { payload }) => {
      state.authUser = payload;
    });
    builder.addCase(doGoogleLogin.fulfilled, (state, { payload }) => {
      state.authUser = payload;
    });
    builder.addCase(validateAccessToken.fulfilled, (state, { payload }) => {
      return;
    });
  },
});

export const authReducer = authSlice.reducer;
