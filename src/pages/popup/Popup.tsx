import React from 'react';
import logo from '@assets/img/logo.svg';
import '@pages/popup/Popup.css';
import useStorage from '@src/shared/hooks/useStorage';
import exampleThemeStorage from '@src/shared/storages/exampleThemeStorage';
import withSuspense from '@src/shared/hoc/withSuspense';
import withErrorBoundary from '@src/shared/hoc/withErrorBoundary';
import { useEffect } from 'react';
import { useState } from 'react';
import { useVisitStore } from './hooks/useVisitStorage';
import { useCurrentTabInfo } from './hooks/useCurrentTabInfo';
import { Homepage } from './pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({});

const Popup = () => {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Homepage />
      </QueryClientProvider>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occured </div>);
