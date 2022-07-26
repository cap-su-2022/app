import AddNewFeedbackResponseModel from "../../models/add-new-feedback-response.model";
import {createSlice} from "@reduxjs/toolkit";
import {addNewFeedback} from "./thunk/Add-new-feedback.thunk";

interface FeedbackState {
  feedback: AddNewFeedbackResponseModel
}

const initialState: FeedbackState = {
  feedback: {} as AddNewFeedbackResponseModel
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder  )=> {
    builder.addCase(addNewFeedback.fulfilled, (state, {payload}) => {
    })
  }
})

export const feedbackReducer = feedbackSlice.reducer
