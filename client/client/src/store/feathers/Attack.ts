import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Attack {
  name: string;
  description: string;
  speed: number;
  intercepts: string[];
  amount: number;
}

interface AttackState {
  attack: Attack[] | null; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AttackState = {
  attack: null,  
  status: 'idle',
  error: null,
};

export const getAttackData = createAsyncThunk(
  'attack/fetchAttack',
  async (AttackData: { name: string }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/api/attack', AttackData);
      // console.log(response.data);
      
      return response.data; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message); 
    }
  }
);

const attackSlice = createSlice({
  name: 'attack',
  initialState,
  reducers: {
    clearMissiles: (state) => {
      state.attack = null;  
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
        state.attack = action.payload; 
        state.error = null;
      })
      .addCase(getAttackData.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearMissiles } = attackSlice.actions;
export default attackSlice.reducer;
