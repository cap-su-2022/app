import { createSlice } from '@reduxjs/toolkit';
import { Slot } from '../../../models/slot.model';
import { fetchAllSlots } from './thunk/fetch-slots.thunk';
import { PaginationResponse } from '../../../models/pagination-response.payload';
import { fetchSlotNames } from './thunk/fetch-slot-names.thunk';
import { fetchSlotById } from './thunk/fetch-by-id.thunk';
import { fetchDeletedSlots } from './thunk/fetch-deleted-device-types';

interface InitialState {
  slots: PaginationResponse<Slot>;
  slot: Slot;
  slotInfor: Slot[];
  deletedSlots: Slot[];
}

const initialState: InitialState = {
  slots: {} as PaginationResponse<Slot>,
  slot: {} as Slot,
  slotInfor: [] as Slot[],
  deletedSlots: [],
};

export const slotSlice = createSlice({
  name: 'slot',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSlotById.fulfilled, (state, { payload }) => {
      state.slot = payload;
    });

    builder.addCase(fetchAllSlots.fulfilled, (state, { payload }) => {
      state.slots = payload;
    });

    builder.addCase(fetchSlotNames.fulfilled, (state, { payload }) => {
      state.slotInfor = payload;
    });

    builder.addCase(fetchDeletedSlots.fulfilled, (state, { payload }) => {
      state.deletedSlots = payload;
    });
  },
});

export const slotReducer = slotSlice.reducer;
