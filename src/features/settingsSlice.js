import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch servers for a company
export const fetchServers = createAsyncThunk(
  'settings/fetchServers',
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://queue-model-server.onrender.com/api/v1/getServer/${companyId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch servers');
    }
  }
);

// Add a new server
export const addServer = createAsyncThunk(
  'settings/addServer',
  async (newServer, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://queue-model-server.onrender.com/api/v1/addServer', newServer, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data.server;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add server');
    }
  }
);

// Delete a server
export const deleteServer = createAsyncThunk(
  'settings/deleteServer',
  async (serverId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://queue-model-server.onrender.com/api/v1/deleteServer/${serverId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete server');
    }
  }
);

// Fetch company details
export const fetchCompanyInfo = createAsyncThunk(
  'settings/fetchCompanyInfo',
  async (companyId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://queue-model-server.onrender.com/api/v1/get-company/${companyId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch company information');
    }
  }
);

// Update company information
export const updateCompanyInfo = createAsyncThunk(
  'settings/updateCompanyInfo',
  async (editedCompanyInfo, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://queue-model-server.onrender.com/api/v1/update-company', editedCompanyInfo, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update company information');
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    servers: [],
    companyInfo: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Servers
      .addCase(fetchServers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchServers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log(action.payload)
        state.servers = action.payload;
      })
      .addCase(fetchServers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Add Server
      .addCase(addServer.fulfilled, (state, action) => {
        state.servers.push(action.payload);
      })

      // Delete Server
      .addCase(deleteServer.fulfilled, (state, action) => {
        state.servers = state.servers.filter((server) => server._id !== action.meta.arg);
      })

      // Fetch Company Info
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.companyInfo = action.payload;
      })

      // Update Company Info
      .addCase(updateCompanyInfo.fulfilled, (state, action) => {
        state.companyInfo = action.payload;
        console.log(action.payload)
      });
  },
});

export default settingsSlice.reducer;
