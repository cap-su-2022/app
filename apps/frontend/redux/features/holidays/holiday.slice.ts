import {createSlice} from "@reduxjs/toolkit";
import {PaginationResponse} from '../../../models/pagination-response.payload';
import {Holiday} from "../../../models/holiday.model";
import {fetchHolidays} from "./thunk/fetch-holidays.thunk";
import {fetchHolidayById} from "./thunk/fetch-holiday-by-id.thunk";
import {fetchDeletedHolidays} from "./thunk/fetch-deleted-holidays.thunk";

interface InitialState {
  holidays: PaginationResponse<Holiday>;
  holiday: Holiday;
  deletedHolidays: Holiday[];

}

const initialState: InitialState = {
  holidays: {} as PaginationResponse<Holiday>,
  holiday: {} as Holiday,
  deletedHolidays: [],

};

export const holidaySlice = createSlice({
  name: 'holiday',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHolidays.fulfilled, (state, {payload}) => {
      state.holidays = payload;
    });
    builder.addCase(fetchHolidayById.fulfilled, (state, {payload}) => {
      state.holiday = payload;
    });
    builder.addCase(fetchDeletedHolidays.fulfilled, (state, {payload}) => {
      state.deletedHolidays = payload;
    });
  }

});

export const holidayReducer = holidaySlice.reducer;
