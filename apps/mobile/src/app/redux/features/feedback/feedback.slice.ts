import AddNewFeedbackResponseModel from "../../models/add-new-feedback-response.model";
import {createSlice} from "@reduxjs/toolkit";
import {addNewFeedback} from "./thunk/Add-new-feedback.thunk";
import {fetchFeedbacks} from "./thunk/fetch-feedbacks.thunk";

interface FeedbackState {
  feedback: AddNewFeedbackResponseModel;
  feedbacks: FeedbackFilterResponse[];
}

const initialState: FeedbackState = {
  feedback: {} as AddNewFeedbackResponseModel,
  feedbacks: [],
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder  )=> {
    builder.addCase(addNewFeedback.fulfilled, (state, {payload}) => {
    });
    builder.addCase(fetchFeedbacks.fulfilled, (state, {payload}) => {
      state.feedbacks = payload;
    });
  }
})

export const feedbackReducer = feedbackSlice.reducer
