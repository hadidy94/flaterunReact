import { createSlice } from '@reduxjs/toolkit';
import { phoneAttemp } from './authActions';


const initialState = {
  username: "",
  email: "",
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
  phone: '', 
  otpSend: false,
};


export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    sendOtpValidate: (state) => {
      const isOtp = localStorage.getItem('sendotp');
      if(isOtp) {
        state.otpSend = true;
      }
      return state;
    }
  },

  extraReducers: {
    [phoneAttemp.fulfilled]: (state, { payload }) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.errorMessage = '';
      state.otpSend = true;
    },

    [phoneAttemp.pending]: (state) => {
      state.isFetching = true;
    },

    [phoneAttemp.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    }
  },
});

export const authSelector = state => state.auth;
export const { clearState, sendOtpValidate } = authSlice.actions;

export default authSlice.reducer;
