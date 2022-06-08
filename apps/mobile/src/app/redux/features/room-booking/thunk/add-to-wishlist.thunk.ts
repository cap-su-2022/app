import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../../constants/constant";
import { LOCAL_STORAGE } from "../../../../utils/local-storage";
import { toggleSpinnerOff, toggleSpinnerOn } from "../../spinner";

interface RejectPayload {
  message: string;
}
interface AddToBookingRoomWishlistPayload {
  roomId: string;
  slot: number;
}
export const addToRoomBookingWishlist = createAsyncThunk<void, AddToBookingRoomWishlistPayload, {
  rejectValue: RejectPayload
}>("booking-room/add-to-wishlist", async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.post(`${API_URL}/booking-room/add-to-wishlist`, {
      roomId: payload.roomId,
      slot: payload.slot
    }, {
      headers: {
        "Authorization": `Bearer ${LOCAL_STORAGE.getString("accessToken")}`
      }
    });
    return await response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue({
      message: e.response.data
    });
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());

  }
});
