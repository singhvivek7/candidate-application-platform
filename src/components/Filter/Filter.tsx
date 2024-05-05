import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { MultipleSelect } from '@/components/MultipleSelect';
import {
  EXPERIENCE_OPTIONS,
  LOCATION_OPTIONS,
  MIN_BASE_PAY_OPTIONS,
  ROLES_OPTIONS,
} from '@/utils/constants';
import { Filters, applyFilters } from '@/store/slice/jobSlice';

import './Filter.css';

const initialFilters = {
  companyName: '',
  location: [],
  roles: [],
  salary: [],
  minSalary: '',
  minExperience: '',
};

export const Filter = () => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(applyFilters(filters));
  }, [dispatch, filters]);

  return (
    <div className="filter-section">
      <TextField
        id="company-name"
        label="Company Name"
        variant="outlined"
        placeholder="Search by company name"
        onChange={e =>
          setFilters(prev => ({ ...prev, companyName: e.target.value }))
        }
        value={filters.companyName}
        className="width-300"
      />
      <MultipleSelect
        options={ROLES_OPTIONS}
        placeholder="Roles"
        selectedOptions={filters.roles}
        setSelectedOptions={(options: string[]) =>
          setFilters(prev => ({ ...prev, roles: options }))
        }
      />

      <FormControl className="width-300">
        <InputLabel id="experience-label">Experience</InputLabel>
        <Select
          labelId="experience-label"
          id="experience-helper"
          value={filters.minExperience}
          label="Experience"
          onChange={e =>
            setFilters(prev => ({ ...prev, minExperience: e.target.value }))
          }>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {EXPERIENCE_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <MultipleSelect
        options={LOCATION_OPTIONS}
        placeholder="Location"
        selectedOptions={filters.location}
        setSelectedOptions={(options: string[]) =>
          setFilters(prev => ({ ...prev, location: options }))
        }
      />
      <FormControl className="width-300">
        <InputLabel id="min-base-pay-label">Min Base Pay</InputLabel>
        <Select
          labelId="min-base-pay-label"
          id="min-base-pay-helper"
          value={filters.minSalary}
          label="Min Base Pay"
          onChange={e =>
            setFilters(prev => ({ ...prev, minSalary: e.target.value }))
          }>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {MIN_BASE_PAY_OPTIONS.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
