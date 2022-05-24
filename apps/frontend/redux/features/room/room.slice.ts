import {createSlice} from "@reduxjs/toolkit";
import {Room} from "../../../models/room.model";
import {getRoomById} from "./thunk/get-room-by-id";
import {disableRoomById} from "./thunk/disable-room-by-id";
import {fetchRooms} from "./thunk/fetch-rooms";
import {updateRoomById} from "./thunk/update-room-by-id";
import {addRoom} from "./thunk/add-room";
import {fetchDisabledRooms} from "./thunk/fetch-disabled-rooms";
import {fetchDeletedRooms} from "./thunk/fetch-deleted-rooms";
import {restoreDisabledRoom} from "./thunk/restore-disabled.thunk";
import {restoreDeletedRoom} from "./thunk/restore-deleted.thunk";
import {deleteRoomById} from "./thunk/delete-room-by-id";

interface RoomState {
  isDownloadModalShown: boolean;
  isRoomAddModalShown: boolean;
  isSuccessModalShown: boolean;
  successMessage: string;

  selectedRoom: Room;
  rooms: Room[];
  disabledRooms: Room[];
  deletedRooms: Room[];

  totalPage: number;
  size: number;
  textSearch: string;
  currentPage: number;
  direction: 'ASC' | 'DESC';
}

const initialState: RoomState = {
  isSuccessModalShown: false,
  isRoomAddModalShown: false,
  isDownloadModalShown: false,

  successMessage: '',
  selectedRoom: {} as Room,
  rooms: [],
  disabledRooms: [],
  deletedRooms: [],

  currentPage: 1,
  size: 3,
  textSearch: '',
  totalPage: 1,
  direction: "ASC",
}

export const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    toggleSuccessModal(state) {
      state.isSuccessModalShown = !state.isSuccessModalShown;
    },
    setSuccessModalMessage(state, action) {
      state.successMessage = action.payload;
    },
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
      state.direction = state.direction === 'ASC' ? 'DESC' : 'ASC';
    },
    resetRoomFilter(state) {
      state.size = 3;
      state.direction = 'ASC';
      state.currentPage = 1;
      state.textSearch = '';
    },
    toggleRoomsDownloadModalVisible(state) {
      state.isDownloadModalShown = !state.isDownloadModalShown;
    },
    toggleRoomAddModalVisible(state) {
      state.isRoomAddModalShown = !state.isRoomAddModalShown;
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
      state.rooms = payload.data;
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
      state.disabledRooms = payload;
    });
    builder.addCase(restoreDisabledRoom.fulfilled, (state, {payload}) => {
    });
    builder.addCase(restoreDeletedRoom.fulfilled, (state, {payload}) => {
    });
    builder.addCase(deleteRoomById.fulfilled, (state, {payload}) => {
    });
  }

});

export const roomReducer = roomSlice.reducer;
export const {
  toggleSuccessModal, setSuccessModalMessage, changeRoomsCurrentPage, changeRoomsSize,
  changeRoomsTextSearch, changeRoomsTotalPage, changeRoomsSortDirection, resetRoomFilter,
  toggleRoomsDownloadModalVisible, toggleRoomAddModalVisible,
} = roomSlice.actions;
