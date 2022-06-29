import { createSlice } from '@reduxjs/toolkit';
import { PaginationResponse } from '../../../models/pagination-response.payload';
import { fetchRoles } from './thunk/fetch-roles.thunk';
import { fetchRoleById } from './thunk/fetch-role-by-id.thunk';
import { Role } from '../../../models/role.model';

interface InitialState {
  roles: PaginationResponse<Role>;
  role: Role;

}

const initialState: InitialState = {
  roles: {} as PaginationResponse<Role>,
  role: {} as Role,
};

export const roleSlice = createSlice({
  name: 'role',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoles.fulfilled, (state, { payload }) => {
      state.roles = payload;
    });
    builder.addCase(fetchRoleById.fulfilled, (state, { payload }) => {
      state.role = payload;
    });
  },
});

export const roleReducer = roleSlice.reducer;
