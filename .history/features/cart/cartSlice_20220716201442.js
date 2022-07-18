import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 products: [],
 cart: [],
};

export const salesSlice = createSlice({
 name: 'cart',
 initialState,
 reducers: {
  getAllData: (state, action) => {
   state.push(action.payload);
   console.log(state, 'reducerLog');
  },
 },
});

export const { addSale } = salesSlice.actions;

export default salesSlice.reducer;
