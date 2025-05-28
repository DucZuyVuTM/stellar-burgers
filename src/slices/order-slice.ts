import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';
import { TOrder } from '@utils-types';

export interface OrderState {
  isLoading: boolean;
  order: TOrder | null;
  error: string | null;
}

const initialState: OrderState = {
  isLoading: false,
  order: null,
  error: null
};

export const getOrder = createAsyncThunk('feed/getOrder', (number: number) =>
  getOrderByNumberApi(number)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    getOrderSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrder.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message as string;
      })
      .addCase(getOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.order = payload.orders[0];
      });
  }
});

export { initialState as orderInitialState };
export const { getOrderSelector } = orderSlice.selectors;

export default orderSlice.reducer;
