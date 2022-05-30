import {createSlice} from "@reduxjs/toolkit";
import {Device} from "../../../models/device.model";
import {fetchDevices} from "./thunk/fetch-devices.thunk";
import {addDevice} from "./thunk/add.thunk";
import {fetchDeviceById} from "./thunk/fetch-by-id.thunk";
import {disableDeviceById} from "./thunk/disable-by-id";
import {deleteDeviceById} from "./thunk/delete-by-id";

interface DevicesState {
  selectedDevice: Device;
  devices: Device[];
  disabledDevices: Device[];
  deletedDevices: Device[];

  totalPage: number;
  size: number;
  currentPage: number;
  textSearch: string;
}

const devicesInitialState: DevicesState = {
  devices: [],
  disabledDevices: [],
  deletedDevices: [],
  selectedDevice: {} as Device,

  totalPage: 1,
  size: 3,
  currentPage: 1,
  textSearch: ''
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
    builder.addCase(fetchDevices.fulfilled, (state, {payload}) => {
      state.devices = payload.data.map((d, index) => {
        d.stt = index + 1 + ((payload.currentPage - 1) * state.size);
        return d;
      });;
      state.currentPage = payload.currentPage;
      state.totalPage = payload.totalPage;
    });
    builder.addCase(addDevice.fulfilled, (state, {payload}) => {
      return;
    });
    builder.addCase(fetchDeviceById.fulfilled, (state, {payload}) => {
      state.selectedDevice = payload;
    });
    builder.addCase(disableDeviceById.fulfilled, (state, {payload}) => {
      return;
    });
    builder.addCase(deleteDeviceById.fulfilled, (state, {payload}) => {
      return;
    });
  },
});

export const devicesReducer = devicesSlice.reducer;

