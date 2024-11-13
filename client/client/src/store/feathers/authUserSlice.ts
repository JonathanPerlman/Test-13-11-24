import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface LoginResponse {
  user: { id: string; username: string; };
  token: string;
}

interface UserState {
  user: { id: string; username: string; } | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

export const registerUser = createAsyncThunk(
  'voter/registerUser',
  async (userData: { username: string; password: string; organization: string; region: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/api/register', userData);
      console.log(response.data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk<LoginResponse, { username: string; password: string }>(
  'voter/loginUser',
  async (loginData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', loginData);
      localStorage.setItem("token", response.data.token);      
      console.log(response.data.data);
      
      return  response.data.data; 
    }   
     catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutVoter: (state) => {
      state.user = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;

      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login user cases
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
    builder
      // Register voter cases
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;

        // Store token in localStorage after registration
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logoutVoter } = userSlice.actions;
export default userSlice.reducer;
