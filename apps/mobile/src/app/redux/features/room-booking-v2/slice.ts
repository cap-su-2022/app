import { createSlice } from '@reduxjs/toolkit';
import {fetchBookedRequestByDayAndSlot} from "./thunk/fetch-booked-request.thunk";
import {BookedRequest} from "../../models/booked-request.model";

interface BookedRequestInitialState {
  bookedRequests: BookedRequest[];
  bookedRequest: BookedRequest;
}

const initialState: BookedRequestInitialState = {
  bookedRequests: [],
  bookedRequest: {} as BookedRequest,
};

const bookedRequestSlice = createSlice({
  name: 'bookedRequest',
  initialState: initialState,
  extraReducers: (builder => {
    builder.addCase(fetchBookedRequestByDayAndSlot.fulfilled, (state, {payload}) => {
      state.bookedRequests = payload
    })
  }),
  reducers: {},
});

export const bookedRequestReducer = bookedRequestSlice.reducer;

