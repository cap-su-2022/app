import { createSlice } from '@reduxjs/toolkit';
import { fetchAccounts } from './thunk/fetch-accounts.thunk';
import { fetchAccountById } from './thunk/fetch-by-id.thunk';
import { PaginationResponse } from '../../../models/pagination-response.payload';
import { Account } from '../../../models/account.model';
import { fetchDisabledAccounts } from './thunk/fetch-disabled.thunk';
import { fetchDeletedAccounts } from './thunk/fetch-deleted.thunk';

// import { updateRoomBookingById } from "./thunk/update-room-booking-by-id";
// import { addRoomBooking } from "./thunk/add-room-booking";

interface InitialState {
  accounts: PaginationResponse<Account>;
  account: Account;
  disabledAccounts: Account[];
  deletedAccounts: Account[];
}

const initialState: InitialState = {
  accounts: {} as PaginationResponse<Account>,
  account: {} as Account,
  disabledAccounts: [],
  deletedAccounts: [],
};

export const accountSlice = createSlice({
  name: 'account',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.fulfilled, (state, { payload }) => {
      state.accounts = payload;
    });

    builder.addCase(fetchAccounts.rejected, (state, { payload }) => {
      console.log('Fetch rejected', state);
    });

    builder.addCase(fetchAccountById.fulfilled, (state, { payload }) => {
      state.account = payload;
    });
    builder.addCase(fetchDisabledAccounts.fulfilled, (state, { payload }) => {
      state.disabledAccounts = payload;
    });
    builder.addCase(fetchDeletedAccounts.fulfilled, (state, { payload }) => {
      state.deletedAccounts = payload;
    });
    //   builder.addCase(updateRoomBookingById.fulfilled, (state, {payload}) => {
    //     console.log("updateRoomBookingById.fulfilled")
    //   });

    //   builder.addCase(addRoomBooking.fulfilled, (state, {payload}) => {
    //     console.log("addRoomBooking.fulfilled")
    //   });

    //   builder.addCase(addRoomBooking.rejected, (state, {payload}) => {
    //     console.log("addRoomBooking.rejected")
    //   });
  },
});

export const accountReducer = accountSlice.reducer;
