import {createSlice} from "@reduxjs/toolkit";
import {Room} from "../../../models/room.model";
import {getRoomById} from "./thunk/get-room-by-id";
import {disableRoomById} from "./thunk/disable-room-by-id";
import {fetchRooms} from "./thunk/fetch-rooms";
import {updateRoomById} from "./thunk/update-room-by-id";
import {addRoom} from "./thunk/add-room";
import {fetchDisabledRooms} from "./thunk/fetch-disabled-rooms";

interface RoomState {
  isRoomUpdateModalShown: boolean;
  isRoomDisableModalShown: boolean;
  isDownloadModalShown: boolean;
  isRoomAddModalShown: boolean;
  isSuccessModalShown: boolean;
  isRoomRestoreDisabledModalShown: boolean;
  successMessage: string;

  selectedRoom: Room;
  rooms: Room[];
  disabledRooms: Room[];

  totalPage: number;
  size: number;
  textSearch: string;
  currentPage: number;
  direction: 'ASC' | 'DESC';
}

const initialState: RoomState = {
  isRoomUpdateModalShown: false,
  isRoomDisableModalShown: false,
  isSuccessModalShown: false,
  isRoomAddModalShown: false,
  isDownloadModalShown: false,
  isRoomRestoreDisabledModalShown: false,

  successMessage: '',
  selectedRoom: {} as Room,
  rooms: [],
  disabledRooms: [],

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
    toggleRoomDisableModalVisible(state) {
      state.isRoomDisableModalShown = !state.isRoomDisableModalShown;
    },
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
    toggleRoomUpdateModalVisible(state) {
      state.isRoomUpdateModalShown = !state.isRoomUpdateModalShown;
    },
    toggleRoomAddModalVisible(state) {
      state.isRoomAddModalShown = !state.isRoomAddModalShown;
    },
    toggleRoomRestoreDisabledModalVisible(state) {
      state.isRoomRestoreDisabledModalShown = !state.isRoomRestoreDisabledModalShown;
    }
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
      state.isRoomUpdateModalShown = false;

    });

    builder.addCase(addRoom.fulfilled, (state, {payload}) => {

    });

    builder.addCase(addRoom.rejected, (state, {payload}) => {

    });

    builder.addCase(fetchDisabledRooms.fulfilled, (state, {payload}) => {
      console.log(payload);
        state.disabledRooms = payload;
    });
  }

});

export const roomReducer = roomSlice.reducer;
export const {
  toggleRoomDisableModalVisible,
  toggleSuccessModal, setSuccessModalMessage, changeRoomsCurrentPage, changeRoomsSize,
  changeRoomsTextSearch, changeRoomsTotalPage, changeRoomsSortDirection, resetRoomFilter,
  toggleRoomsDownloadModalVisible, toggleRoomUpdateModalVisible, toggleRoomAddModalVisible,
  toggleRoomRestoreDisabledModalVisible
} = roomSlice.actions;
