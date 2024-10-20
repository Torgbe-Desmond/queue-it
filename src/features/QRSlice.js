import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for getting server details
export const getServerDetails = createAsyncThunk(
  'qrCode/getServerDetails',
  async ({ serverId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://queue-model-server.onrender.com/api/v1/server-details/${serverId}`);
      return response.data; // Return the response data if the request is successful
    } catch (error) {
      // Return error message in case of failure
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

const qrCodeSlice = createSlice({
  name: 'qrCode',
  initialState: {
    serverDetails: null, // To hold server details
    error: null, // To hold any error messages
    loading: false, // To indicate loading state
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload; // Update error message
    },
    clearError(state) {
      state.error = null; // Clear error message
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServerDetails.pending, (state) => {
        state.loading = true; // Set loading to true when the request is initiated
        state.error = null; // Clear any previous errors
      })
      .addCase(getServerDetails.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false
        state.serverDetails = action.payload; // St
      })
      .addCase(getServerDetails.rejected, (state, action) => {
        state.loading = false; // Set loading to false when the request fails
        state.error = action.payload; // Set error message
      });
  },
});

// Export actions and reducer
export const {
  setError,
  clearError,
} = qrCodeSlice.actions;

export default qrCodeSlice.reducer;
