import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export interface feedState {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
}

const initialState: feedState = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null
};

export const getFeed = createAsyncThunk('feed/getFeed', getFeedsApi);

export const getOrders = createAsyncThunk('feed/getProfileFeed', getOrdersApi);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedStateSelector: (state) => state,
    getOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(getFeed.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orders = payload.orders;
        state.total = payload.total;
        state.totalToday = payload.totalToday;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.orders = payload;
      });
  }
});

export { initialState as feedInitialState };
export const { getFeedStateSelector, getOrdersSelector } = feedSlice.selectors;

export default feedSlice.reducer;
