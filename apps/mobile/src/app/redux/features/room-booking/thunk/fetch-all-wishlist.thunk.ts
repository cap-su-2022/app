import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../../constants/constant";
import { toggleSpinnerOff, toggleSpinnerOn } from "../../spinner";
import { RoomWishListResponse } from "../../../models/wishlist-booking-room.model";
import { LOCAL_STORAGE } from "../../../../utils/local-storage";


interface RejectValue {
  message: string;
}

export const fetchAllWishlistRooms = createAsyncThunk<RoomWishListResponse[], string, {
  rejectValue: RejectValue;
}>("room-booking/fetch-all-wishlist", async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.get(`${API_URL}/booking-room/wishlist?roomName=${payload}`, {
      headers: {
        'Authorization': `Bearer ${LOCAL_STORAGE.getString('accessToken')}`
      }
    });
    return await response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
