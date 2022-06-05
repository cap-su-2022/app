import { createSlice } from "@reduxjs/toolkit";
import { BookingRoom } from "../../models/booking-room.model";
import { fetchAllBookingRooms } from "./thunk/fetch-all";
import { fetchAllWishlistRooms } from "./thunk/fetch-all-wishlist.thunk";
import { RoomWishListResponse } from "../../models/wishlist-booking-room.model";
import { addToRoomBookingWishlist } from "./thunk/add-to-wishlist.thunk";

interface RoomBookingState {
  bookingRooms: BookingRoom[],
  wishlistBookingRooms: RoomWishListResponse[];
}

const initialState: RoomBookingState = {
  bookingRooms: [],
  wishlistBookingRooms: [],
}

const roomBookingSlice = createSlice({
  name: 'room-booking',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBookingRooms.fulfilled, (state, {payload}) => {
      state.bookingRooms = payload;
    });
    builder.addCase(fetchAllBookingRooms.rejected, (state, {payload}) => {

    });
    builder.addCase(fetchAllWishlistRooms.fulfilled, (state, {payload}) => {
      state.wishlistBookingRooms = payload;
    });
    builder.addCase(addToRoomBookingWishlist.fulfilled, (state, {payload}) => {

    });
    builder.addCase(addToRoomBookingWishlist.rejected, (state, {payload}) => {

    });
  }
});

export const roomBookingReducer = roomBookingSlice.reducer;


