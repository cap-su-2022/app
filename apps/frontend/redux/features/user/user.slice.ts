import {createSlice} from "@reduxjs/toolkit";
import {addDevice} from "./thunk/add.thunk";
import {fetchUserById} from "./thunk/fetch-by-id.thunk";
import {disableDeviceById} from "./thunk/disable-by-id";
import {deleteDeviceById} from "./thunk/delete-by-id";
import {User} from "../../../models/user.model";
import {fetchUsers} from "./thunk/fetch-users.thunk";

interface UsersState {
  selectedUser: User;
  users: User[];
  disabledUsers: User[];
  deletedUsers: User[];

  totalPage: number;
  size: number;
  currentPage: number;
  textSearch: string;
  direction: 'ASC' | 'DESC';

}

const usersInitialState: UsersState = {
  users: [],
  disabledUsers: [],
  deletedUsers: [],
  selectedUser: {} as User,

  totalPage: 1,
  size: 3,
  currentPage: 1,
  textSearch: '',
  direction: "ASC"
}

const usersSlice = createSlice({
  name: 'user',
  initialState: usersInitialState,
  reducers: {
    changeTextSearch(state, action) {
      state.textSearch = action.payload;
    },
    changePageIndex(state, action) {
      state.currentPage = action.payload;
    }
  },
  extraReducers: builder =>  {
    builder.addCase(fetchUsers.fulfilled, (state, {payload}) => {
      state.users = payload.data.map((d, index) => {
        d.stt = index + 1 + ((payload.currentPage - 1) * state.size);
        return d;
      });
      state.currentPage = payload.currentPage;
      state.totalPage = payload.totalPage;
    });
    builder.addCase(addDevice.fulfilled, (state, {payload}) => {
      return;
    });
    builder.addCase(fetchUserById.fulfilled, (state, {payload}) => {
      state.selectedUser = payload;
    });
    builder.addCase(disableDeviceById.fulfilled, (state, {payload}) => {
      return;
    });
    builder.addCase(deleteDeviceById.fulfilled, (state, {payload}) => {
      return;
    });
  },
});

export const {
  changePageIndex
} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;

