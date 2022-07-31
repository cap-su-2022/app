import AddNewFeedbackResponseModel from "../../models/add-new-feedback-response.model";
import {createSlice} from "@reduxjs/toolkit";
import {addNewFeedback} from "./thunk/Add-new-feedback.thunk";
import {fetchFeedbacks} from "./thunk/fetch-feedbacks.thunk";
import {FeedbackModel} from "../../models/feedback.model";
import {fetchFeedbackById} from "./thunk/fetch-feedback-by-id.thunk";

interface FeedbackState {
  feedback: FeedbackModel;
  feedbacks: FeedbackFilterResponse[];
}

const initialState: FeedbackState = {
  feedback: {} as FeedbackModel,
  feedbacks: [],
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder  )=> {
    builder.addCase(fetchFeedbackById.fulfilled, (state, {payload}) => {
      state.feedback = payload;
    });
    builder.addCase(fetchFeedbacks.fulfilled, (state, {payload}) => {
      state.feedbacks = payload;
    });
  }
})

export const feedbackReducer = feedbackSlice.reducer
