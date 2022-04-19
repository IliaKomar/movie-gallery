import { lazy } from "react";

export const routes = [
    {
        path: '/',
        element: lazy(() => import('../pages/Home')),
        id: 'home'
    },
    {
        path: '/favorites',
        element: lazy(() => import('../pages/Favorites')),
        id: 'favorite'
    }
];