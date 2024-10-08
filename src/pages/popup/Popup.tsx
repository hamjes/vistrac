import '@pages/popup/Popup.css';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { Homepage } from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { VisitsPage } from './pages/visits';

const queryClient = new QueryClient({});

const Popup = () => {
  const [page, setPage] = useState<'Home' | 'Visits'>('Home');

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        {page === 'Home' && (
          <Homepage
            next={() => setPage('Visits')} // Navigate to VisitsPage
          />
        )}
        {page === 'Visits' && (
          <VisitsPage
            goBack={() => setPage('Home')} // Navigate back to Homepage
          />
        )}
      </QueryClientProvider>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div>Loading ...</div>), <div>Error Occurred</div>);
