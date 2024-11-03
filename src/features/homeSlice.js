import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for handling the API request
export const fetchCustomer = createAsyncThunk(
  'home/fetchCustomer',
  async (customerCode, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://queue-model-server.onrender.com/api/v1/customers', {
        serverNumber: customerCode,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data; // Axios returns the response data directly
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const loginServer = createAsyncThunk(
  'home/loginServer',
  async (serverCode, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://queue-model-server.onrender.com/api/v1/loginServer', {
        serverNumber: serverCode,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const scanQrCode = createAsyncThunk(
  'home/scanQrCode',
  async (qrCode, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://queue-model-server.onrender.com/api/v1/loginServer', {
        serverNumber: qrCode,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Create the slice
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    customerLoading: false,
    serverLoading: false,
    qrLoading: false,
    error: null,

  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.customerLoading = true;
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.customerLoading = false;
        // Handle the successful customer fetch here (e.g., update state with customer data)
      })
      .addCase(fetchCustomer.rejected, (state, action) => {
        state.customerLoading = false;
        state.error = action.payload; // Store the error message
      })
      .addCase(loginServer.pending, (state) => {
        state.serverLoading = true;
      })
      .addCase(loginServer.fulfilled, (state, action) => {
        state.serverLoading = false;
        // Handle the successful server login here
      })
      .addCase(loginServer.rejected, (state, action) => {
        state.serverLoading = false;
        state.error = action.payload;
      })
      .addCase(scanQrCode.pending, (state) => {
        state.qrLoading = true;
      })
      .addCase(scanQrCode.fulfilled, (state, action) => {
        state.qrLoading = false;
        // Handle successful QR code scan here
      })
      .addCase(scanQrCode.rejected, (state, action) => {
        state.qrLoading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export default homeSlice.reducer;
