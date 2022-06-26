import { createSlice } from "@reduxjs/toolkit";
import { RoomType } from "../../../models/room-type.model";

interface InitialState {
  roomTypes: RoomType[];
}

const initialState: InitialState = {
  roomTypes: []
};

export const roomTypeSlice = createSlice({
  name: "roomType",
  initialState: initialState,
  extraReducers: (builder) => {

  };
});
