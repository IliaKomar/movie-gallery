import React from 'react';
import MainLayout from './layouts/MainLayout';
import Router from './router';
import { routes } from './router/config';
import { FavoritesProvider } from "./context/favorites";

const App = () => {
    return (
        <FavoritesProvider>
            <MainLayout>
                <Router routes={routes} />
            </MainLayout>
        </FavoritesProvider>
    );
};

export default App;
