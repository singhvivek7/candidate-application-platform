import { JobInfo, JobResponse } from '@/types/type';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: JobResponse = {
  jdList: [],
  totalCount: 0,
};

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJobs: (state, action: PayloadAction<JobResponse | JobInfo[]>) => {
      if (Array.isArray(action.payload)) {
        state.jdList = [...state.jdList, ...action.payload];
      } else {
        state.jdList = [...state.jdList, ...action.payload.jdList];
        state.totalCount = action.payload.totalCount;
      }
    },
  },
});

export const { addJobs } = jobSlice.actions;

export default jobSlice.reducer;
