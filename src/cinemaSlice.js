// src/cinemaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCinemas = createAsyncThunk('cinema/fetchCinemas', async () => {
  const response = await axios.get("http://localhost:8000/api/cinemaimport");
  return response.data.data.reverse();
});

export const deleteCinema = createAsyncThunk('cinema/deleteCinema', async (id) => {
  await axios.delete(`http://localhost:8000/api/cinemaimport/${id}`);
  return id;
});

const cinemaSlice = createSlice({
  name: 'cinema',
  initialState: {
    cinemas: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinemas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCinemas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cinemas = action.payload;
      })
      .addCase(fetchCinemas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCinema.fulfilled, (state, action) => {
        state.cinemas = state.cinemas.filter((cinema) => cinema._id !== action.payload);
      });
  },
});

export default cinemaSlice.reducer;
