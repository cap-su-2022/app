import { createAsyncThunk } from "@reduxjs/toolkit";
import { BookingRoom } from "../../../models/booking-room.model";
import axios from "axios";
import { API_URL } from "../../../../constants/constant";

interface RejectValue {
  message: string;
}
export const fetchAllBookingRooms = createAsyncThunk<BookingRoom[], void, {
  rejectValue: RejectValue
}>('room-booking/fetch-all', async (any, thunkAPI) => {

  try {
    const response = await axios.get(`${API_URL}/booking-room`, {
      headers: {
        'Authorization': ``
      }
    });
    return await response.data;
  } catch (e) {
    console.error(e);
    thunkAPI.rejectWithValue({
      message: e.message,
    })
  }
});
