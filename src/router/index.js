import React from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';

const Router = ({ routes }) => {
    return (
        <Routes>
            {routes.map((route) => (
                <Route key={route.id} path={route.path} element={route.component} />
            ))}
        </Routes>
    );
};
Router.propTypes = {
    route: PropTypes.arrayOf(PropTypes.object)
}

export default Router;
