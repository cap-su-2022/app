import {createSlice} from "@reduxjs/toolkit";
import {Room} from "../../../models/room.model";
import {getRoomById} from "./thunk/get-room-by-id";


interface RoomState {
  isRoomDetailModalShown: boolean;
  isRoomDisableModalShown: boolean;
  selectedRoom: Room;
}

const initialState: RoomState = {
  isRoomDetailModalShown: false,
  isRoomDisableModalShown: false,
  selectedRoom: {} as Room,
}

export const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    showRoomInfoModal(state) {
      state.isRoomDetailModalShown = true;
    },
    hideRoomInfoModal(state) {
      state.isRoomDetailModalShown = false;
    },
    toggleRoomDisableModalVisible(state) {
      state.isRoomDisableModalShown = !state.isRoomDisableModalShown;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRoomById.pending, (state) => {

    });
    builder.addCase(getRoomById.fulfilled, (state, {payload}) => {
      state.selectedRoom = payload;
      state.isRoomDetailModalShown = true;
    });
    builder.addCase(getRoomById.rejected, (state, {payload}) => {

    });
  }

});

export const roomReducer = roomSlice.reducer;
export const {showRoomInfoModal, hideRoomInfoModal, toggleRoomDisableModalVisible} = roomSlice.actions;
