import { Home } from '@/pages/Home/Home';
import { StoreProvider } from '@/store/provider';

export const App = () => (
  <StoreProvider>
    <Home />
  </StoreProvider>
);
