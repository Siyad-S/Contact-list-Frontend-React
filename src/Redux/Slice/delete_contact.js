import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//action
export const deleteContact = createAsyncThunk ( 'deleteContact', async (id) => {
    const response = await axios.delete (`http://localhost:4000/${id}`)
    return response.data
} )

const deleteContactSlice = createSlice({
    name: "deleteContact",
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(deleteContact.pending, (state, action) => {
            state.isLoading = true
        });
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(deleteContact.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
        })
    },

})

export default deleteContactSlice.reducer;