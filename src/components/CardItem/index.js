import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import StarIcon from '../../images/star.svg';
import StarOutlinedIcon from '../../images/star-outlined.svg';

import styles from './styles.module.scss';

const CardItem = ({ img, name, year, handleOpenModal, handleAddToFavourite }) => {
    return (
        <div className={styles.wrapper} onClick={handleOpenModal}>
            <img src={StarOutlinedIcon} alt='star-icon' className={styles.starIcon} onClick={handleAddToFavourite} />
            <div className={styles.overlay}>
                <img src={img} alt='movie-img' className={styles.movieImg} />
            </div>
            <div className={styles.infoWrapper}>
                <div className={classNames(styles.infoText, styles.name)}>
                    <strong>{name}</strong>
                </div>
                <div className={styles.infoText}>
                    <strong>{year}</strong>
                </div>
            </div>
        </div>
    );
};

CardItem.propTypes = {
    img: PropTypes.string,
    name: PropTypes.string,
    year: PropTypes.number,
    handleOpenModal: PropTypes.func,
    handleAddToFavourite: PropTypes.func
};

export default CardItem;
