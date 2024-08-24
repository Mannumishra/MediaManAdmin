// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import cinemaReducer from './cinemaSlice';

const store = configureStore({
  reducer: {
    cinema: cinemaReducer,
  },
});

export default store;
