import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../../../constants/constant";
import { toggleSpinnerOff, toggleSpinnerOn } from "../../spinner";
import { LOCAL_STORAGE } from "../../../../utils/local-storage";

interface RejectValue {
  message: string;
}

interface CheckSlotOverTimePayload {
  date: string,
  slotin: string
}

export const checkOverSlot = createAsyncThunk<boolean, CheckSlotOverTimePayload, {
  rejectValue: RejectValue
}>("room-booking/check-over-slot", async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    console.log(payload)
    const response = await axios.get(`${API_URL}/booking-room/check-slot-over-time`, {
      params: {
        date: payload.date,
        slotin: payload.slotin
      }
    });
    console.log(response.data)
    return await response.data;
  } catch (e) {
    console.error(e);
    thunkAPI.rejectWithValue({
      message: e.message,
    })
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
