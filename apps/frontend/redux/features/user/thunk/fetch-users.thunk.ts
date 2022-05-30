import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {toggleSpinnerOff, toggleSpinnerOn} from "../../spinner";
import {RootState} from "../../../store";
import {User} from "../../../../models/user.model";

interface FetchUsersSuccessResponse {
  data: User[],
  currentPage: number;
  totalPage: number;
  size: number;
}

interface RejectPayload {
  message: string;
}


export const fetchUsers = createAsyncThunk<FetchUsersSuccessResponse, void, {
  rejectValue: RejectPayload
}>('user/fetch-users', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  const state = thunkAPI.getState() as RootState;
  try {
    const response = await axios.post(`api/accounts`, {
      search: state.user.textSearch,
      page: state.user.currentPage,
      size: state.user.size,
      sort: state.user.direction
    });

    return await response.data as FetchUsersSuccessResponse;
  } catch ({response}) {
    if (response.status === 401 || response.status === 403) {
      return thunkAPI.rejectWithValue({
        message: 'Access token is invalid'
      })
    }
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
