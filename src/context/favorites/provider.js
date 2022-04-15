import { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { reducer } from './reducer';
import { FavoritesContext } from './context';
import { LOCAL_STORAGE_KEYS } from '../../constants';

export let dispatchMovies = null;

export const FavoritesProvider = ({ children }) => {
  const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITE_MOVIES)) || [];
  
  const [movies, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITE_MOVIES, JSON.stringify(movies))
  }, [movies]);
  
  dispatchMovies = dispatch;

  return (
    <FavoritesContext.Provider value={movies}>
        {children}
    </FavoritesContext.Provider>
  );
};
FavoritesProvider.propTypes = {
    children: PropTypes.node
};
