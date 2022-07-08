import {createSlice} from "@reduxjs/toolkit";
import {Device} from "../../../models/device.model";
import {fetchDevices} from "./thunk/fetch-devices.thunk";
import {addDevice} from "./thunk/add.thunk";
import {fetchDeviceById} from "./thunk/fetch-by-id.thunk";
import {disableDeviceById} from "./thunk/disable-by-id";
import {deleteDeviceById} from "./thunk/delete-by-id";
import { fetchDeletedDevices } from "./thunk/fetch-deleted.thunk";
import { fetchDisabledDevices } from "./thunk/fetch-disabled.thunk";
import { PaginationResponse } from '../../../models/pagination-response.payload';
import { restoreDisabledDevice } from "./thunk/restore-disabled.thunk";
import { restoreDeletedDevice } from "./thunk/restore-deleted.thunk";
import { updateDeviceById } from "./thunk/update-by-id";

interface DevicesState {
  device: Device;
  devices: PaginationResponse<Device>;
  disabledDevices: Device[];
  deletedDevices: Device[];

  totalPage: number;
  size: number;
  currentPage: number;
  textSearch: string;
  direction: 'ASC' | 'DESC';

}

const devicesInitialState: DevicesState = {
  devices: {} as PaginationResponse<Device>,
  disabledDevices: [],
  deletedDevices: [],
  device: {} as Device,

  totalPage: 1,
  size: 3,
  currentPage: 1,
  textSearch: '',
  direction: 'ASC'
}

const devicesSlice = createSlice({
  name: 'device',
  initialState: devicesInitialState,
  reducers: {
    changeTextSearch(state, action) {
      state.textSearch = action.payload;
    },
  },
  extraReducers: builder =>  {
    builder.addCase(fetchDeviceById.fulfilled, (state, { payload }) => {
      state.device = payload;
    });
    builder.addCase(fetchDeviceById.rejected, (state, {payload}) => {

    });

    builder.addCase(disableDeviceById.pending, (state) => {

    });

    builder.addCase(disableDeviceById.fulfilled, (state, {payload}) => {

    });

    builder.addCase(disableDeviceById.rejected, (state, {payload}) => {

    });

    builder.addCase(fetchDevices.fulfilled, (state, { payload }) => {
      state.devices = payload;
    });

    builder.addCase(fetchDevices.rejected, (state, {payload}) => {

    });

    builder.addCase(updateDeviceById.fulfilled, (state, {payload}) => {

    });

    builder.addCase(addDevice.fulfilled, (state, {payload}) => {

    });

    builder.addCase(addDevice.rejected, (state, {payload}) => {

    });

    builder.addCase(fetchDisabledDevices.fulfilled, (state, {payload}) => {
        state.disabledDevices = payload;
    });
    builder.addCase(fetchDeletedDevices.fulfilled, (state, {payload}) => {
      state.deletedDevices = payload;
    });
    builder.addCase(restoreDisabledDevice.fulfilled, (state, {payload}) => {
      return;

    });
    builder.addCase(restoreDeletedDevice.fulfilled, (state, {payload}) => {
      return;

    });
    builder.addCase(deleteDeviceById.fulfilled, (state, {payload}) => {
      return;
    });
  }
});

export const devicesReducer = devicesSlice.reducer;

