import {createSlice} from "@reduxjs/toolkit";

export interface UserState {
    role: string;
    username: string;
    googleIdToken: string;
};

const initialState: UserState = {
  role: '',
  username: '',
  googleIdToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.username = 'test'
    },
    logout: (state) => {
      state.username = ''
    },
    persistGoogleIdToken: (state, action) => {
      state.googleIdToken = action.payload
    }
  },
});

export const {login, logout, persistGoogleIdToken} = userSlice.actions;
export default userSlice.reducer;
