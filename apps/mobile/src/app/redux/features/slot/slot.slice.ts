import { createSlice } from '@reduxjs/toolkit';
import { Slot } from '../../models/slot.model';
import { fetchAllSlots } from './thunk/fetch-all-slots.thunk';

interface SlotInitialState {
  slots: Slot[];
  slot: Slot;
}

const initialState: SlotInitialState = {
  slots: [],
  slot: {} as Slot,
}

const slotSlice = createSlice({
  name: 'slot',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllSlots.fulfilled, (state, {payload}) => {
      state.slots = payload;
    })
  },
  initialState: initialState,
});

export const slotReducer = slotSlice.reducer;

