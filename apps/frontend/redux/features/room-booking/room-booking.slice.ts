import { createSlice } from '@reduxjs/toolkit';
import { RoomBooking } from '../../../models/room-booking.model';
import { fetchRoomBookings } from './thunk/fetch-room-booking-list';
import { fetchRoomBookingById } from './thunk/fetch-room-booking-by-id';
import { PaginationResponse } from '../../../models/pagination-response.payload';

// import { updateRoomBookingById } from "./thunk/update-room-booking-by-id";
// import { addRoomBooking } from "./thunk/add-room-booking";

interface InitialState {
  roomBookings: PaginationResponse<RoomBooking>;
  roomBooking: RoomBooking;

}

const initialState: InitialState = {
  roomBookings: {} as PaginationResponse<RoomBooking>,
  roomBooking: {} as RoomBooking,

};

export const roomBookingSlice = createSlice({
  name: 'roomBooking',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoomBookings.fulfilled, (state, { payload }) => {
      console.log("PAYLOAD NE: ",payload)
      state.roomBookings = payload;
    });

    builder.addCase(fetchRoomBookings.rejected, (state, { payload }) => {
      console.log('Fetch rejected', state);
    });

    builder.addCase(fetchRoomBookingById.fulfilled, (state, { payload }) => {
      state.roomBooking = payload;
    });

    //   builder.addCase(updateRoomBookingById.fulfilled, (state, {payload}) => {
    //     console.log("updateRoomBookingById.fulfilled")
    //   });

    //   builder.addCase(addRoomBooking.fulfilled, (state, {payload}) => {
    //     console.log("addRoomBooking.fulfilled")
    //   });

    //   builder.addCase(addRoomBooking.rejected, (state, {payload}) => {
    //     console.log("addRoomBooking.rejected")
    //   });
  },
});

export const roomBookingReducer = roomBookingSlice.reducer;
