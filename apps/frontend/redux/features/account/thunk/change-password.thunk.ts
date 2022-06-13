import { createAsyncThunk } from '@reduxjs/toolkit';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import axios from 'axios';

interface RejectValue {
  message: string;
}

interface ChangePasswordRequestModel {
  password: string;
}

export interface ChangePasswordResponseModel {
  message: string;
}

export const changePassword = createAsyncThunk<
  ChangePasswordResponseModel,
  ChangePasswordRequestModel,
  {
    rejectValue: RejectValue;
  }
>('account/change-password', async (payload, thunkApi) => {
  thunkApi.dispatch(toggleSpinnerOn());
  try {
    const response = await axios.put(`/api/accounts/update/change-password`, {
      password: payload.password,
    });
    return await response.data;
  } catch ({ response }) {
    if (response.status === 401 || response.status === 403) {
      return thunkApi.rejectWithValue({
        message: 'Access token is invalid',
      });
    }
  } finally {
    thunkApi.dispatch(toggleSpinnerOff());
  }
});
