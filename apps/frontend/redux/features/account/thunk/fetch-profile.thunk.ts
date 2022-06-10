import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';

export const fetchProfile = createAsyncThunk(
  `/accounts/my-profile`,
  async (payload, thunkAPI) => {
    thunkAPI.dispatch(toggleSpinnerOn());
    const response = await axios.get(`/api/accounts/my-profile`, {});
    const data = await response.data;
    window.localStorage.setItem('user', JSON.stringify(data));
    thunkAPI.dispatch(toggleSpinnerOff());
    return data;
  }
);
