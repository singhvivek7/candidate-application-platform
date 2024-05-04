import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

interface Props {
  children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => (
  <Provider store={store}>{children}</Provider>
);
