import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (companyDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://queue-model-server.onrender.com/api/v1/admin/login', companyDetails);
      return response.data;  // Return the response data if the login is successful
    } catch (error) {
      // Return error message in case of failure
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

// Create async thunk for login
export const register = createAsyncThunk(
    'auth/register',
    async (companyDetails, { rejectWithValue }) => {
      try {
        const response = await axios.post('https://queue-model-server.onrender.com/api/v1/admin/register', companyDetails);
        return response.data;  // Return the response data if the login is successful
      } catch (error) {
        // Return error message in case of failure
        return rejectWithValue(error.response?.data || 'Something went wrong');
      }
    }
  );

  

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isAuthenticated:false,
      user: null,
      loading: false,
      error: null,

    },
    reducers: {
      logout: (state) => {
        state.user = null;
        localStorage.removeItem('token')
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(login.fulfilled, (state, action) => {
          const { token } = action.payload;
          localStorage.setItem('token',JSON.stringify(token));
          state.isAuthenticated = true;
          state.loading = false;
          state.user = action.payload; 
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;  // Save the error message
        })
        .addCase(register.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isAuthenticated = true;
          state.loading = false;
          state.user = action.payload;  // Save the logged-in user data
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;  // Save the error message
        });
    },
  });
  
  export const { logout } = authSlice.actions;
  
  export default authSlice.reducer;
