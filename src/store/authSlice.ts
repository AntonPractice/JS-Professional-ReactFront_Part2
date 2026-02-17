import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { storage } from '../utils/storage';

interface AuthState {
  token: string | null;
  user: any | null; // замените any на ваш тип User
}

const initialState: AuthState = {
  token: storage.getToken(),
  user: storage.getUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: any }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      storage.setToken(action.payload.token);
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