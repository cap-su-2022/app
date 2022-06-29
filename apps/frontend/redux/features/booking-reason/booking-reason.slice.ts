import { createSlice } from '@reduxjs/toolkit';
import { PaginationResponse } from '../../../models/pagination-response.payload';

import { BookingReason } from 'apps/frontend/models/booking-reason.model';
import { fetchBookingReasonById } from './thunk/fetch-booking-reason-by-id.thunk';
import { fetchBookingReasons } from './thunk/fetch-booking-reasons.thunk';

interface InitialState {
  deviceTypes: PaginationResponse<BookingReason>;
  deviceType: BookingReason;
}

const initialState: InitialState = {
  deviceTypes: {} as PaginationResponse<BookingReason>,
  deviceType: {} as BookingReason,
};

export const bookingReasonSlice = createSlice({
  name: 'booking-reason',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookingReasons.fulfilled, (state, { payload }) => {
      state.deviceTypes = payload;
    });
    builder.addCase(fetchBookingReasonById.fulfilled, (state, { payload }) => {
      state.deviceType = payload;
    });
  },
});

export const bookingReasonReducer = bookingReasonSlice.reducer;
