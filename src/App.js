import React from 'react';
import MainLayout from './layouts/MainLayout';
import Router from './router';
import { routes } from './router/config';

const App = () => {
  return (
    <MainLayout>
      <Router routes={routes} />
    </MainLayout>
  )
}

export default App;
