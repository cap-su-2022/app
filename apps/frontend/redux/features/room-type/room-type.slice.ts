import { createSlice } from '@reduxjs/toolkit';
import { RoomType } from '../../../models/room-type.model';
import { PaginationResponse } from '../../../models/pagination-response.payload';
import { fetchRoomTypes } from './thunk/fetch-room-types.thunk';

interface InitialState {
  roomTypes: PaginationResponse<RoomType>;
}

const initialState: InitialState = {
  roomTypes: {} as PaginationResponse<RoomType>,
};

export const roomTypeSlice = createSlice({
  name: 'roomType',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoomTypes.fulfilled, (state, { payload }) => {
      state.roomTypes = payload;
    });
  },
});

export const roomTypeReducer = roomTypeSlice.reducer;
