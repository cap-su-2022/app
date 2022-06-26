import { createSlice } from '@reduxjs/toolkit';
import { fetchDeviceTypes } from './thunk/fetch-device-types.thunk';
import { PaginationResponse } from '../../models/pagination-response.payload';
import { DeviceType } from '../../models/device-type.model';

interface InitialState {
  deviceTypes: PaginationResponse<DeviceType>;
}

const initialState: InitialState = {
  deviceTypes: {} as PaginationResponse<DeviceType>,
};

export const deviceTypeSlice = createSlice({
  name: 'device-type',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeviceTypes.fulfilled, (state, { payload }) => {
      state.deviceTypes = payload;
    });
  },
});

export const deviceTypeReducer = deviceTypeSlice.reducer;
