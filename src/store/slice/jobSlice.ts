import { JobInfo, JobResponse } from '@/types/type';
import { createSlice } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Filters {
  minExperience: string;
  companyName: string;
  location: string[];
  roles: string[];
  salary: string[];
  minSalary: string;
}

interface JobState extends JobResponse {
  filters: Filters;
}

const initialState: JobState = {
  jdList: [],
  totalCount: 0,
  filters: {
    minExperience: '',
    companyName: '',
    location: [],
    roles: [],
    salary: [],
    minSalary: '',
  },
};

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    addJobs: (state, action: PayloadAction<JobResponse | JobInfo[]>) => {
      if (Array.isArray(action.payload)) {
        state.jdList = uniqBy([...state.jdList, ...action.payload], 'jdUid');
      } else {
        state.jdList = uniqBy(
          [...state.jdList, ...action.payload.jdList],
          'jdUid'
        );
        state.totalCount = action.payload.totalCount;
      }
    },
    applyFilters: (state, action: PayloadAction<JobState['filters']>) => {
      state.filters = action.payload;
    },
    resetFilters: state => {
      state.filters = initialState.filters;
    },
  },
});

export const { addJobs, applyFilters, resetFilters } = jobSlice.actions;

export default jobSlice.reducer;
