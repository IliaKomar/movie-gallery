import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import StarOutlinedIcon from '../../assets/star-outlined.svg';
import StarIcon from '../../assets/star.svg';

import styles from './styles.module.scss';
import checkIsLocalStorageItem from '../../utils/checkIsLocalStorageItem';
import { FavoritesContext } from '../../context/favorites';

const ModalWindow = ({ activeMovieId, handleCloseModal, handleAddToFavorites, handleRemoveFromFavorites }) => {
    const [data, setData] = useState(null);
    const movies = useContext(FavoritesContext);

    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/moviedb-tech/movies/list/${activeMovieId}`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(() => { });
    }, [activeMovieId]);

    const isAdded = checkIsLocalStorageItem(movies, activeMovieId);
    return (
        <div className={styles.modal} onClick={handleCloseModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()} >
                {
                    data
                        ? (
                            <div className={styles.contentWrapper}>
                                <div onClick={isAdded ? handleRemoveFromFavorites(data.id) : handleAddToFavorites(data)}>
                                    {
                                        isAdded
                                            ? <StarIcon className={styles.starIcon} />
                                            : <StarOutlinedIcon className={styles.starIcon} />
                                    }
                                </div>
                                <div className={styles.mainContentAtTheTop}>
                                    <div>
                                        <img src={data.img} className={styles.movieImg} />
                                    </div>
                                    <div>
                                        <div className={styles.nameWithDescription}>
                                            <div className={classNames(styles.text, styles.name)}>
                                                <strong>{data.name}</strong>
                                            </div>
                                            <div className={styles.text}>{data.description}</div>
                                        </div>
                                        <div className={classNames(styles.text, styles.year)}>
                                            Year: <strong>{data.year}</strong>
                                        </div>
                                        <div className={classNames(styles.text, styles.director)}>
                                            Director: <strong>{data.director}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.genresWrapper}>
                                    <div className={classNames(styles.infoTitle, styles.infoTitle)}>Genres:</div>
                                    {
                                        data.genres.map((genre) => (
                                            <div key={genre} className={styles.genreBlock}>
                                                <div className={classNames(styles.text, styles.genre)}>{genre}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={styles.starringWrapper}>
                                    <div className={classNames(styles.infoTitle, styles.infoTitle)}>Starring:</div>
                                    {
                                        data.starring.map((actor) => (
                                            <div key={actor} className={styles.starring}>
                                                <div className={classNames(styles.text, styles.actorName)}>{actor}</div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                        : <div className={styles.loading}>Loading...</div>
                }
            </div>
        </div>
    );
};
ModalWindow.propTypes = {
    activeMovieId: PropTypes.number,
    handleCloseModal: PropTypes.func,
    handleAddToFavorites: PropTypes.func,
    isAdded: PropTypes.bool,
    handleRemoveFromFavorites: PropTypes.func
};

export default ModalWindow;
