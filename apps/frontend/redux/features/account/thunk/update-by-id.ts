import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleSpinnerOff, toggleSpinnerOn } from "../../spinner";
import { Device } from "../../../../models/device.model";

interface UpdatePayload {
  id: string;
  payload: Device;
}

interface RejectValue {
  message: string;
}

export const updateAccountById = createAsyncThunk<any,
  UpdatePayload,
  {
    rejectValue: RejectValue;
  }>("account/update-by-id", async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.put(
      `/api/accounts/update/id/${payload.id}`,
      payload.payload
    );
    return await response.data;
  } catch ({ response }) {
    if (response.status === 401 || response.status === 403) {
      return thunkAPI.rejectWithValue({
        message: "Access token is invalid"
      });
    }
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
