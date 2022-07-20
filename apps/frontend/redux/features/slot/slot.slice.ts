import { createSlice } from '@reduxjs/toolkit';
import { Slot } from '../../../models/slot.model';
import { fetchAllSlots } from './thunk/fetch-slots.thunk';
import { PaginationResponse } from '../../../models/pagination-response.payload';
import { fetchSlotNames } from './thunk/fetch-slot-names.thunk';

interface InitialState {
  slots: PaginationResponse<Slot>;
  slot: Slot;
  slotInfor: Slot[];
}

const initialState: InitialState = {
  slots: {} as PaginationResponse<Slot>,
  slot: {} as Slot,
  slotInfor: [] as Slot[],
};

export const slotSlice = createSlice({
  name: 'slot',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSlots.fulfilled, (state, { payload }) => {
      state.slots = payload;
    });

    builder.addCase(fetchSlotNames.fulfilled, (state, { payload }) => {
      state.slotInfor = payload;
    });
  },
});

export const slotReducer = slotSlice.reducer;
