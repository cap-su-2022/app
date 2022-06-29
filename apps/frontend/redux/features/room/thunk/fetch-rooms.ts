import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toggleSpinnerOff, toggleSpinnerOn } from '../../spinner';
import { Room } from '../../../../models/room.model';
import { RootState } from '../../../store';
import { PaginationParams } from '../../../../models/pagination-params.model';
import { PaginationResponse } from '../../../../models/pagination-response.payload';


interface FetchRoomsRejectPayload {
  message: string;
}

export const fetchRooms = createAsyncThunk<
  PaginationResponse<Room>,
  PaginationParams,
  {
    rejectValue: FetchRoomsRejectPayload;
  }
>('room/fetch-rooms', async (payload, thunkAPI) => {
  thunkAPI.dispatch(toggleSpinnerOn());
  try {
    console.log(payload);
    const response = await axios.get(`api/rooms`, {
      params: {
        page: payload.page,
        search: payload.search,
        dir: payload.dir,
        limit: payload.limit,
        sort: payload.sort,
      },
    });
    console.log("DATTAAAAA",response.data)
    return await response.data;
  } catch ({ response }) {
    if (response.status === 401 || response.status === 403) {
      return thunkAPI.rejectWithValue({
        message: 'Access token is invalid',
      });
    }
  } finally {
    thunkAPI.dispatch(toggleSpinnerOff());
  }
});
