

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllContacts = createAsyncThunk(
  "contactList/fetchAllContacts",
  async ({ page, limit, search }) => {
    try {
      const response = await axios.get(`http://localhost:4000?search=${search}&page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const contactListSlice = createSlice({
  name: "getAllContacts",
  initialState: {
    isLoading: false,
    data: {
      total: 0,
      totalPages: "",
      currentPage: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      data: [],
    },
    isError: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllContacts.pending, (state) => {
        state.isLoading = true;
        state.isError = false; // Reset isError when starting a new request
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data = action.payload;
      })
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error fetching contacts", action);
      });
  },
});

export default contactListSlice.reducer;
