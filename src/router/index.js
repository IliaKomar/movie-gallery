import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Routes, Route } from 'react-router-dom';

const Router = ({ routes }) => {
    return (
        <Routes>
            {routes.map(({ id, path, element: Element }) => (
                <Route
                    key={id}
                    path={path}
                    element={
                        <Suspense>
                            <Element />
                        </Suspense>
                    }
                />
            ))}
        </Routes>
    );
};
Router.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.object)
};

export default Router;
