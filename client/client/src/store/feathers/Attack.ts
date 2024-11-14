import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Attack {
  name: string;
  description: string,
  speed: number,
  intercepts: string[],
  amount: number
}



interface attackState {
  defends: Attack[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: attackState = {
    defends: null,
  status: 'idle',
  error: null,
};

export const getAttackData = createAsyncThunk(
  'Attack/fetchAttack',
  async (AttackData: { attackName: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/api/attack', AttackData);
      console.log(response.data.data);
      
      return response.data.data; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message); 
    }
  }
);

const defendSlice = createSlice({
  name: 'attack',
  initialState,
  reducers: {
    clearMissiles : (state) => {
      state.defends = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAttackData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAttackData.fulfilled, (state, action: PayloadAction<Attack[]>) => {
        state.status = 'succeeded';
        state.defends = action.payload;
        state.error = null;
      })
      .addCase(getAttackData.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearMissiles } = defendSlice.actions;
export default defendSlice.reducer;
