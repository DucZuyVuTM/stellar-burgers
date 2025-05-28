import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  forgotPasswordApi,
  resetPasswordApi
} from '@api';
import type { TRegisterData, TLoginData } from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../utils/cookie';

export interface UserState {
  isLoadong: boolean;
  user: TUser | null;
  isAuthorized: boolean;
  error: string | null;
}

const initialState: UserState = {
  isLoadong: false,
  user: null,
  isAuthorized: false,
  error: null
};

export const loginUser = createAsyncThunk(
  'user/login',
  (loginData: TLoginData) => loginUserApi(loginData)
);

export const registerUser = createAsyncThunk(
  'user/register',
  (registerData: TRegisterData) => registerUserApi(registerData)
);

export const logoutUser = createAsyncThunk('user/logout', logoutApi);

export const updateUser = createAsyncThunk(
  'user/update',
  (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const forgotPassword = createAsyncThunk(
  'user/frogotPassword',
  (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const getUser = createAsyncThunk('user/get', getUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    }
  },
  selectors: {
    getUserStateSelector: (state) => state,
    getUserSelector: (state) => state.user,
    isAuthorizedSelector: (state) => state.isAuthorized,
    getUserErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoadong = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthorized = true;
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoadong = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthorized = true;
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(logoutUser.fulfilled, (state, { payload }) => {
        state.isLoadong = false;
        state.error = null;
        state.user = null;
        state.isAuthorized = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoadong = false;
        state.error = null;
        state.user = payload.user;
        state.isAuthorized = true;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(forgotPassword.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoadong = false;
        state.error = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoadong = false;
        state.error = null;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoadong = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, { error }) => {
        state.isLoadong = false;
        state.error = error.message as string;
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.isLoadong = false;
        state.error = null;
        state.isAuthorized = true;
        state.user = payload.user;
      });
  }
});

export { initialState as userInitialState };
export const { clearUserError } = userSlice.actions;
export const {
  getUserStateSelector,
  getUserSelector,
  isAuthorizedSelector,
  getUserErrorSelector
} = userSlice.selectors;

export default userSlice.reducer;
