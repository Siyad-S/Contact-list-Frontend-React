import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const updateContactdata = createAsyncThunk("updateContactdata", async ({id, updatedData}) => {
  try {
    const response = await axios.put(`http://localhost:4000/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.log("error occured on updating : ", error);
    throw error;
  }
});
//action

const initialState = {
  isLoading:false,
  data:[],
  isError:false,
}
const updateContact = createSlice({
  name: "updateContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateContactdata.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateContactdata.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((contact) => 
          contact.id === action.payload.id ? action.payload : contact
        );
        state.isError = false;
      })
      .addCase(updateContactdata.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
  },
});

export default updateContact.reducer;
