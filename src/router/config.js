import Home from '../pages/Home';
import Favorites from '../pages/Favorites';

export const routes = [
    {
        path: '/',
        component: <Home />,
        id: 'home'
    },
    {
        path: '/favorites',
        component: <Favorites />,
        id: 'favorite'
    }
];