import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FavoritesIcon from '../../images/favorites.svg';

import styles from './styles.module.scss';

const Header = ({ showFavorites }) => {
    return (
        <header className={styles.headerWrapper}>
            <div className={styles.header}>
          Movies Gallery
            </div>
            {
                showFavorites &&
          <Link to='/favorites'>
              <img src={FavoritesIcon} className={styles.favoriteImg} />
          </Link>
            }
        </header>
    );
};

Header.propTypes = {
    showFavorites: PropTypes.bool
};
Header.defaultProps = {
    showFavorites: true
};
export default Header;