import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
// import { doLogin } from './operations';

const initialState = {
  userId: null,
  login: null,
  email: null,
  stateChange: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      email: payload.email,
      login: payload.login,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    startLoading: (state, { payload }) => ({
      ...state,
      isLoading: true,
    }),
    endLoading: (state, { payload }) => ({
      ...state,
      isLoading: false,
    }),
  },
});

console.log(authSlice);

export const authReducer = authSlice.reducer;

export const { updateUserProfile, authStateChange, startLoading, endLoading } =
  authSlice.actions;
