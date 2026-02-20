import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../utils/storage';
import type { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: storage.getToken(),
  user: storage.getUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ access_token: string; user: User }>) => {
      state.token = action.payload.access_token;
      state.user = action.payload.user;
      storage.setToken(action.payload.access_token);
      storage.setUser(action.payload.user);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      storage.clearAuth();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;