import { createSlice } from "@reduxjs/toolkit";
import { BookingRoom } from "../../models/booking-room.model";
import { fetchAllBookingRooms } from "./thunk/fetch-all";
import { fetchAllWishlistRooms } from "./thunk/fetch-all-wishlist.thunk";
import { RoomWishListResponse } from "../../models/wishlist-booking-room.model";
import { addToRoomBookingWishlist } from "./thunk/add-to-wishlist.thunk";
import { fetchBookingRoomDevices } from "./thunk/fetch-booking-room-devices.thunk";
import { Device } from "../../models/device.model";
import {fetchChoosingBookingRoom} from "./thunk/fetch-choosing-booking-room.thunk";
import {ChoosingBookingRoom} from "../../models/choosing-booking-room.model";

interface RoomBookingState {
  bookingRooms: BookingRoom[],
  wishlistBookingRooms: RoomWishListResponse[];
  choosingBookingRooms: ChoosingBookingRoom[];
  devices: Device[],
  addRoomBooking: AddRoomBookingPayload,
}

interface BookingDevice {
  devideId: string;
  quantity: number;
}

interface AddRoomBookingPayload {
  fromSlot: string;
  toSlot: string;
  roomId: string;
  devices: BookingDevice[];
}

const initialState: RoomBookingState = {
  bookingRooms: [],
  wishlistBookingRooms: [],
  devices: [],
  choosingBookingRooms: [],
  addRoomBooking: {} as AddRoomBookingPayload,
};

const roomBookingSlice = createSlice({
  name: 'room-booking',
  initialState: initialState,
  reducers: {
    step1ScheduleRoomBooking(state, {payload}) {
      console.log(payload)
      state.addRoomBooking = {
        ...state.addRoomBooking,
        fromSlot: payload.fromSlot,
        toSlot: payload.toSlot,
      }
    },
    step2ScheduleRoomBooking(state, {payload}) {
      state.addRoomBooking = {
        ...state.addRoomBooking,
        roomId: payload.roomId
      }
    },
    step3ScheduleRoomBooking(state, {payload}) {
      state.addRoomBooking = {
        ...state.addRoomBooking,
        devices: payload.devices
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBookingRooms.fulfilled, (state, {payload}) => {
      state.bookingRooms = payload;
    });
    builder.addCase(fetchAllBookingRooms.rejected, (state, {payload}) => {

    });
    builder.addCase(fetchAllWishlistRooms.fulfilled, (state, { payload }) => {
      state.wishlistBookingRooms = payload;
    });
    builder.addCase(addToRoomBookingWishlist.fulfilled, (state, { payload }) => {

    });
    builder.addCase(addToRoomBookingWishlist.rejected, (state, { payload }) => {

    });
    builder.addCase(fetchBookingRoomDevices.fulfilled, (state, { payload }) => {
      state.devices = payload;
    });
    builder.addCase(fetchChoosingBookingRoom.fulfilled, (state, {payload}) => {
      state.choosingBookingRooms = payload;
    });
  }
});

export const roomBookingReducer = roomBookingSlice.reducer;

export const {step1ScheduleRoomBooking, step2ScheduleRoomBooking, step3ScheduleRoomBooking} = roomBookingSlice.actions;
