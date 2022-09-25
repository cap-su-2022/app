import { createSlice } from '@reduxjs/toolkit';

interface HolidayInitialState {}

const initialState: HolidayInitialState = {};

export const holidaysSlice = createSlice({
  initialState,
  name: 'holiday',
  reducers: {},
  extraReducers: {},
});

export const holidaysReducer = holidaysSlice.reducer;
