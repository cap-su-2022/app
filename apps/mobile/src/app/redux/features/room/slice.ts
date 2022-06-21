import {createSlice} from "@reduxjs/toolkit";
import {Room} from "../../../../../../frontend/models/room.model";
import {fetchRoomById} from "./thunk/fetch-room-by-id.thunk";

interface InitialState {
  room: Room;
}

const initialState: InitialState = {
  room: {} as Room
}

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoomById.fulfilled, (state, {payload}) => {
      state.room = payload;
    });
  }
});

export const roomReducer = roomSlice.reducer;
