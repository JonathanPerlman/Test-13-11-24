import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Organization {
    name: string;
    resources: {
        name: string;
        amount: number;
    }[];
    budget: number;
};


interface organizationState {
    organization: Organization | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: organizationState = {
    organization: null,
    status: 'idle',
    error: null,
};

export const getOrganization = createAsyncThunk(
    'Organization/fetchOrganization',
    async (organizationData: { id: string; organization: string; region: string }, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3000/api/defends', organizationData);
            console.log(response.data.data);

            return response.data.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
);

const organizationSlice = createSlice({
    name: 'Organization',
    initialState,
    reducers: {
        clearMissiles: (state) => {
            state.organization = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrganization.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getOrganization.fulfilled, (state, action: PayloadAction<Organization>) => {
                state.status = 'succeeded';
                state.organization = action.payload;
                state.error = null;
            })
            .addCase(getOrganization.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearMissiles } = organizationSlice.actions;
export default organizationSlice.reducer;
