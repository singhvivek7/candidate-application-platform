import { ReactNode } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import './loader.css';

interface Props {
  isLoading: boolean;
  children: ReactNode;
}

export const Spinner = () => (
  <Box sx={{ display: 'flex' }}>
    <CircularProgress />
  </Box>
);

export const Loader = ({ children, isLoading }: Props) =>
  isLoading ? (
    <Box className="loader">
      <CircularProgress />
    </Box>
  ) : (
    children
  );
