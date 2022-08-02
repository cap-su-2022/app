import { createSlice } from '@reduxjs/toolkit';
import { RoomBookingFeedback } from '../../models/room-booking-feedback.model';

interface InitialState {
  roomBookingFeedbacks: RoomBookingFeedback[];
  roomBookingFeedback: RoomBookingFeedback;
}

const initialState: InitialState = {
  roomBookingFeedbacks: [],
  roomBookingFeedback: {} as RoomBookingFeedback,
};

const roomBookingFeedbackSlice = createSlice({
  name: 'room-booking-feedback',
  initialState: null,
  reducers: {},
  extraReducers: {},
});

export const roomBookingFeedbackReducer = roomBookingFeedbackSlice.reducer;
