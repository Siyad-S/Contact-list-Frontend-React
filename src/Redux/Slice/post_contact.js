import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postContactAsync = createAsyncThunk(
  "postContact/postContactAsync",
  async (formData) => {
    try {
      const response = await axios.post(`http://localhost:4000`, formData);
      console.log(response.data);
    } catch (error) {
      console.log("Error occurred during post contact", error);
      throw error;
    }
  }
);

// Slice
const postContactSlice = createSlice({
  name: "postContact",
  initialState: {
    formData: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setPostContact: (state, action) => {
      state.formData = { ...action.payload };
    }
  },
});

export const { setPostContact } = postContactSlice.actions;
export const selectPostContact = (state) => state.postContact.formData;

export default postContactSlice.reducer;
