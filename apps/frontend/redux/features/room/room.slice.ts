import {createSlice} from "@reduxjs/toolkit";
import {Room} from "../../../models/room.model";
import {getRoomById} from "./thunk/get-room-by-id";
import { disableRoomById } from "./thunk/disable-room-by-id";
import { fetchRooms } from "./thunk/fetch-rooms";
import { updateRoomById } from "./thunk/update-room-by-id";
import { addRoom } from "./thunk/add-room";
import { fetchDisabledRooms } from "./thunk/fetch-disabled-rooms";
import { fetchDeletedRooms } from "./thunk/fetch-deleted-rooms";
import { restoreDisabledRoom } from "./thunk/restore-disabled.thunk";
import { restoreDeletedRoom } from "./thunk/restore-deleted.thunk";
import { deleteRoomById } from "./thunk/delete-room-by-id";

interface Direction {
  name: string;
  direction: "ASC" | "DESC";
}

interface RoomState {
  selectedRoom: Room;
  rooms: Room[];
  disabledRooms: Room[];
  deletedRooms: Room[];

  totalPage: number;
  size: number;
  textSearch: string;
  currentPage: number;
  direction: Direction[];
}

const defaultDirection: Direction[] = [
  {
    name: "name",
    direction: "ASC"
  },
  {
    name: "description",
    direction: "ASC"
  }
];

const initialState: RoomState = {
  selectedRoom: {} as Room,
  rooms: [],
  disabledRooms: [],
  deletedRooms: [],

  currentPage: 1,
  size: 3,
  textSearch: "",
  totalPage: 1,
  direction: defaultDirection
}

export const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    changeRoomsCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    changeRoomsSize(state, action) {
      state.size = action.payload;
    },
    changeRoomsTextSearch(state, action) {
      state.textSearch = action.payload;
    },
    changeRoomsTotalPage(state, action) {
      state.totalPage = action.payload;
    },
    changeRoomsSortDirection(state) {
      return;
    },
    resetRoomFilter(state) {
      state.size = 3;
      state.direction = defaultDirection;
      state.currentPage = 1;
      state.textSearch = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoomById.pending, (state) => {

    });
    builder.addCase(getRoomById.fulfilled, (state, {payload}) => {
      state.selectedRoom = payload;
    });
    builder.addCase(getRoomById.rejected, (state, {payload}) => {

    });

    builder.addCase(disableRoomById.pending, (state) => {

    });

    builder.addCase(disableRoomById.fulfilled, (state, {payload}) => {

    });

    builder.addCase(disableRoomById.rejected, (state, {payload}) => {

    });

    builder.addCase(fetchRooms.fulfilled, (state, {payload}) => {
      state.totalPage = payload.totalPage;
      state.rooms = payload.data.map((r, index) => {
        r.stt = index + 1 + ((payload.currentPage - 1) * state.size);
        console.log(r.stt);
        return r;
      });
    });

    builder.addCase(fetchRooms.rejected, (state, {payload}) => {

    });

    builder.addCase(updateRoomById.fulfilled, (state, {payload}) => {

    });

    builder.addCase(addRoom.fulfilled, (state, {payload}) => {

    });

    builder.addCase(addRoom.rejected, (state, {payload}) => {

    });

    builder.addCase(fetchDisabledRooms.fulfilled, (state, {payload}) => {
        state.disabledRooms = payload;
    });
    builder.addCase(fetchDeletedRooms.fulfilled, (state, {payload}) => {
      state.deletedRooms = payload;
    });
    builder.addCase(restoreDisabledRoom.fulfilled, (state, {payload}) => {
      return;

    });
    builder.addCase(restoreDeletedRoom.fulfilled, (state, {payload}) => {
      return;

    });
    builder.addCase(deleteRoomById.fulfilled, (state, {payload}) => {
      return;
    });
  }

});

export const roomReducer = roomSlice.reducer;
export const {
  changeRoomsCurrentPage, changeRoomsSize,
  changeRoomsTextSearch, changeRoomsTotalPage, changeRoomsSortDirection, resetRoomFilter,
} = roomSlice.actions;
