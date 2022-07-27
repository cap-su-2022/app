import {createAsyncThunk} from "@reduxjs/toolkit";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";
import axios from "axios";
import {BookingRoomStatistics} from "../../../../models/booking-room-statistics.model";
import {Statistics} from "../../../../models/statistics.model";


export const fetchStatistic = createAsyncThunk<BookingRoomStatistics, void,
  {
    rejectValue: {
      message: string
    };
  }>('booking-room/fetch-statistics', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.get('api/booking-room/statistics');
    console.log(response.data);
    return await response.data;
//chay cho nay thu..chay đi
  } catch ({response}) {
    if (response.status === 401 || response.status === 403) {
      return thunkAPI.rejectWithValue({
        message: "Access token is invalid"
      });
    } else {
      return thunkAPI.rejectWithValue({
        message: response.data.message
      });
    }
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
