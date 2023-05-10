import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';

const initialState = {
  user: { userId: null, login: null, email: null },
  stateChange: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => ({
      user: { userId: null, login: null, email: null },
      stateChange: false,
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

export const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  startLoading,
  endLoading,
} = authSlice.actions;
