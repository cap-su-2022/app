import {createSlice} from "@reduxjs/toolkit";

type SystemState = {
  errorMessage: string;
}

const initialState: SystemState = {
  errorMessage: '',
}
export const systemSlice = createSlice({
  name: 'system',
  initialState: initialState,
  reducers: {
    setSystemErrorMessage(state, action) {
      state.errorMessage = action.payload;
    }
  }
});

export const systemReducer = systemSlice.reducer;
export const {setSystemErrorMessage} = systemSlice.actions;
