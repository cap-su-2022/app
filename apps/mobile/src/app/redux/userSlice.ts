import {createSlice} from "@reduxjs/toolkit";


export interface UserProfileModel {
  fullname: string;
  phone: string;
  studentCode: string;
}
export interface UserState {
    role: string;
    username: string;
    googleIdToken: string;
    user: UserProfileModel;
};

const initialState: UserState = {
  role: '',
  username: '',
  googleIdToken: '',
  user: {
    fullname: 'Ngô Nguyên Bằng',
    phone: '',
    studentCode: '',
  }
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
    },
    updateProfile: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const {login, logout, persistGoogleIdToken, updateProfile} = userSlice.actions;
export default userSlice.reducer;
