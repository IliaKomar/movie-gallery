import React, { useContext } from 'react';
import classNames from 'classnames';
import Header from '../../components/Header';

import CrossIcon from '../../assets/cross.svg';

import { dispatchMovies, FavoritesContext, favoritesActions } from '../../context/favorites';

import styles from './styles.module.scss';

const Favorites = () => {
    const movies = useContext(FavoritesContext)
    const handleRemoveMovie = (id) => () => {
        dispatchMovies(favoritesActions.removeMovie(id))
    }
    return (
        <div>
            <Header showFavorites={false} />
            <div className={styles.wrapper}>
                {
                    movies.map(({ img, name, year, description, genres, id }) => {
                        return (
                            <div className={styles.favoriteMovieWrapper} key={id}>
                                <div className={styles.contentWrapper}>
                                    <div onClick={handleRemoveMovie(id)}>
                                        <CrossIcon  className={styles.crossIcon}/>
                                    </div>
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
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Favorites;
