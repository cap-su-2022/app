import { createSlice } from '@reduxjs/toolkit';
import { Slot } from '../../../models/slot.model';
import { fetchAllSlots } from './thunk/fetch-slots.thunk';
import { PaginationResponse } from '../../../models/pagination-response.payload';

interface InitialState {
  slots: PaginationResponse<Slot>;
  slot: Slot;
}

const initialState: InitialState = {
  slots: {} as PaginationResponse<Slot>,
  slot: {} as Slot,
};

export const slotSlice = createSlice({
  name: 'slot',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSlots.fulfilled, (state, { payload }) => {
      state.slots = payload;
    });
  },
});

export const slotReducer = slotSlice.reducer;
