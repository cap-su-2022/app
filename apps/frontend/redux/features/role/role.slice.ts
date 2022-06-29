import { createSlice } from '@reduxjs/toolkit';
import { DeviceType } from '../../../models/device-type.model';
import { PaginationResponse } from '../../../models/pagination-response.payload';
import { fetchRoles } from './thunk/fetch-roles.thunk';
import { fetchRoleById } from './thunk/fetch-role-by-id.thunk';
import { Role } from '../../../models/role.model';

interface InitialState {
  deviceTypes: PaginationResponse<Role>;
  deviceType: Role;
}

const initialState: InitialState = {
  deviceTypes: {} as PaginationResponse<Role>,
  deviceType: {} as Role,
};

export const roleSlice = createSlice({
  name: 'role',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoles.fulfilled, (state, { payload }) => {
      state.deviceTypes = payload;
    });
    builder.addCase(fetchRoleById.fulfilled, (state, { payload }) => {
      state.deviceType = payload;
    });
  },
});

export const roleReducer = roleSlice.reducer;
