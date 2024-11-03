import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for getting server details
export const getServerDetails = createAsyncThunk(
  'card/getServerDetails',
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


const cardSlice = createSlice({
  name: 'card',
  initialState: {
    isLoading: false,
    isServerAuthenticated:false,
    hasReceivedCustomer: false,
    serverMessage: null,
    messageType: '',
    isOnline: false,
    customerData: null,
    company: {
      companyId: null,
      serverId: null,
    },
    serverDetails: null, // Add state for server details
    error: null, // Add error state
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
    connectServer(state) {
      state.isOnline = true;
      state.serverMessage = null;
    },
    disconnectServer(state) {
      state.isOnline = false;
      state.hasReceivedCustomer = false;
      state.serverMessage = null;
      state.customerData = null; // Reset customer data on disconnect
    },
    receiveCustomer(state, action) {
      state.customerData = action.payload;
      state.hasReceivedCustomer = true;
      state.isLoading = false;
      state.messageType = 'info';
      state.serverMessage = 'New customer received';
    },
    serverIdle(state, action) {
      state.messageType = 'info';
      state.serverMessage = action.payload.message;
    },
    doneServing(state) {
      state.hasReceivedCustomer = false;
      state.isLoading = true;
    },
    setServerMessage(state, action) {
      state.serverMessage = action.payload.message;
      state.messageType = action.payload.type;
    },
    setCompanyDetails(state, action) {
      state.company.companyId = action.payload.companyId;
      state.company.serverId = action.payload.serverId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServerDetails.pending, (state) => {
        state.isLoading = true; // Set loading state to true
        state.error = null; // Clear any existing error
      })
      .addCase(getServerDetails.fulfilled, (state, action) => {
        state.isLoading = false; // Set loading state to false
        state.serverDetails = action.payload; // Store the received server details
      })
      .addCase(getServerDetails.rejected, (state, action) => {
        state.isLoading = false; // Set loading state to false
        state.error = action.payload; // Store the error message
      });
  },
});

// Export actions and reducer
export const {  
  startLoading,
  stopLoading,
  connectServer,
  disconnectServer,
  receiveCustomer,
  serverIdle,
  doneServing,
  setServerMessage,
  setCompanyDetails,
} = cardSlice.actions;

export default cardSlice.reducer;
