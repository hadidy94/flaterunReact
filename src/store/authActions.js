import { createAsyncThunk } from '@reduxjs/toolkit';
export const phoneAttemp = createAsyncThunk(
    "users/phoneAttemp",
    async ({ username , deviceId}, thunkAPI) => {
      try {
        const response = await fetch(
          "http://api.flatruns.com/api/user/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",

            },
            body: JSON.stringify({
                username,
                deviceId
            }),
          }
        )
  
        let data = await response.json()
  
        console.log("data", data)
        if (response.status === 200) {
            localStorage.setItem('username', username);
            localStorage.setItem('sendotp', 1);
            return { ...data };
        } else {
            return thunkAPI.rejectWithValue(data);
        }
  
      } catch (e) {
        console.log("Error", e.response.data)
        return thunkAPI.rejectWithValue(e.response.data)
      }
    }
)

export const otpAttemp = createAsyncThunk(
    "users/otpAttemp",
    async ({ username , code, deviceId, deviceType}, thunkAPI) => {
      try {
        const response = await fetch(
          "http://api.flatruns.com/api/user/otp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",

            },
            body: JSON.stringify({
                username,
                code,
                deviceId,
                deviceType
            }),
          }
        )
  
        let data = await response.json()
  
        console.log("data", data)
        if (response.status === 200) {
            localStorage.setItem('username', username);
            localStorage.setItem('sendotp', 1);
            return { ...data };
        } else {
            return thunkAPI.rejectWithValue(data);
        }
  
      } catch (e) {
        console.log("Error", e.response.data)
        return thunkAPI.rejectWithValue(e.response.data)
      }
    }
)