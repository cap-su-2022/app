import { UploadAvatarRequestModel } from "./../upload-avatar-request.model";
import { UploadAvatarResponseModel } from "./../upload-avatar-response.model";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toggleSpinnerOff, toggleSpinnerOn } from "../../spinner";
import axios from "axios";

interface RejectValue {
  message: string;
}

export const uploadAvatar = createAsyncThunk<UploadAvatarResponseModel,
  UploadAvatarRequestModel,
  {
    rejectValue: RejectValue;
  }>("account/upload-avatar", async (payload, thunkApi) => {
  thunkApi.dispatch(toggleSpinnerOn());
  try {
    if (payload.img) {
      const formData = new FormData();
      console.log(payload.img);
      formData.append("file", payload.img);
      formData.append("upload_preset", "my-uploads");
      // const response = await axios.put(
      //   `api/accounts/update/upload-avatar/${payload.id}`,
      //   {
      //     file: payload.img,
      //   },
      // );
      console.log(formData);
      const data = await fetch(
        `api/accounts/update/upload-avatar/${payload.id}`,
        {
          method: "PUT",
          body: formData
        }
      ).then((r) => r.json());
      return await data;
    } else {
      return thunkApi.rejectWithValue;
    }
  } catch ({ response }) {
    if (response.status === 401 || response.status === 403) {
      return thunkApi.rejectWithValue({
        message: "Access token is invalid"
      });
    } else if (response.status === 400) {
      return thunkApi.rejectWithValue({
        message: "Bad request"
      });
    }
  } finally {
    thunkApi.dispatch(toggleSpinnerOff());
  }
});
