import Home from '../pages/Home';
import Favorite from '../pages/Favorite';

export const routes = [
    {
        path: '/',
        component: <Home />,
        id: 'home'
    },
    {
        path: '/favorites',
        component: <Favorite />,
        id: 'favorite'
    }
];