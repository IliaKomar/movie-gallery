import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import StarIcon from '../../assets/star.svg';
import StarOutlinedIcon from '../../assets/star-outlined.svg';

import styles from './styles.module.scss';

const ListItem = ({ movie, handleOpenModal, handleAddToFavorites, handleRemoveFromFavorites, isAddedMovie }) => {
    const { img, name, year, description, genres } = movie;

    return (
        <div className={styles.wrapper} onClick={handleOpenModal}>
            <div
                onClick={isAddedMovie ? handleRemoveFromFavorites : handleAddToFavorites}
            >
                {
                    isAddedMovie
                        ? <StarIcon className={styles.starIcon} />
                        : <StarOutlinedIcon className={styles.starIcon} />
                }
            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.overlay}>
                    <img src={img} alt='movie-img' className={styles.movieImg} />
                </div>
                <div className={styles.content}>
                    <div className={styles.nameWithYearWrapper}>
                        <div className={classNames(styles.text, styles.name)}>
                            <strong>{name}</strong>
                        </div>
                        <div className={styles.text}>
                            <strong>{year}</strong>
                        </div>
                    </div>
                    <div className={classNames(styles.text, styles.description)}>{description}</div>
                    <div className={styles.genresWrapper}>
                        {
                            genres.map((genre, index) => (
                                <div key={index} className={styles.genreBlock}>
                                    <div className={classNames(styles.text, styles.genre)}>{genre}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

ListItem.propTypes = {
    movie: PropTypes.object,
    handleOpenModal: PropTypes.func,
    handleAddToFavorites: PropTypes.func,
    handleRemoveFromFavorites: PropTypes.func,
    isAddedMovie: PropTypes.bool
};

export default ListItem;