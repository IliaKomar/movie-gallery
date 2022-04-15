import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import FavoritesIcon from '../../images/favorites.svg';

import styles from './styles.module.scss';

const Header = ({ showFavorites }) => {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    }
    return (
        <header className={styles.headerWrapper}>
            {
                !showFavorites &&
                <div
                    className={styles.navButton}
                    onClick={handleGoBack}
                >
                    Go back
                </div>
            }
            <div className={styles.header}>
                Movies Gallery
            </div>
            {
                showFavorites &&
                <Link to='/favorites'>
                    <img src={FavoritesIcon} className={styles.favoriteImg} />
                </Link>
            }
        </header >
    );
};

Header.propTypes = {
    showFavorites: PropTypes.bool
};
Header.defaultProps = {
    showFavorites: true
};
export default Header;