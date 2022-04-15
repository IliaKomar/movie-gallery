import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import useFetch from '../../hooks/useFetch';

import CardItem from '../../components/CardItem';
import ListItem from '../../components/ListItem';
import Header from '../../components/Header';
import DisplayTool from '../../components/DisplayTool';
import SelectGenreTool from '../../components/SelectGenreTool';
import { dispatchMovies, FavoritesContext, favoritesActions } from '../../context/favorites';

import checkIsLocalStorageItem from '../../utils/checkIsLocalStorageItem';

import { DISPLAY_TYPES, LOCAL_STORAGE_KEYS } from '../../constants';

import styles from './styles.module.scss';
import ModalWindow from '../../components/ModalWindow';

const Home = () => {
    const localStorageGenre = localStorage.getItem(LOCAL_STORAGE_KEYS.GENRE);
    const localStorageView = localStorage.getItem(LOCAL_STORAGE_KEYS.VIEW);
    
    const [typeView, setTypeView] = useState(localStorageView ?? DISPLAY_TYPES.CARD);
    const [activeGenre, setActiveGenre] = useState(localStorageGenre ?? 'all');
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [activeMovieId, setActiveMovieId] = useState(null);
    const movies = useContext(FavoritesContext);
    const { data, error } = useFetch('https://my-json-server.typicode.com/moviedb-tech/movies/list');

    if (error) return <h1>There is an error.</h1>;

    const isCardView = typeView === DISPLAY_TYPES.CARD;

    const genresArray = [...new Set(data?.flatMap(({ genres }) => genres))];
    const availableGenresObj = genresArray.reduce((acc, genre) => {
        return [...acc, { value: genre, label: genre }];
    }, [{ value: 'all', label: 'all' }]);

    const handlChangeGenres = (value) => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.GENRE, value);
        setActiveGenre(value);
    };

    const handleOpenModal = (id) => () => {
        setIsModalOpened(true);
        setActiveMovieId(id);
    };

    const handleCloseModal = () => {
        setIsModalOpened(false);
        setActiveMovieId(null);
    };

    const handleAddToFavorites = (movie) => (e) => {
        dispatchMovies(favoritesActions.addMovie(movie))
        e.stopPropagation()
    };

    const handleRemoveFromFavorites = (movieId) => (e) => {
        dispatchMovies(favoritesActions.removeMovie(movieId))
        e.stopPropagation()
    }

    return (
        <div>
            <Header />
            <div className={styles.wrapper}>
                <div className={styles.toolsWrapper}>
                    <div className={styles.selectGenreWrapper}>
                        <SelectGenreTool label='Genre: ' data={availableGenresObj} onChange={({ value }) => handlChangeGenres(value)} />
                    </div>
                    <DisplayTool setTypeView={setTypeView} isCardView={isCardView} />
                </div>
                {
                    data
                        ? (
                            <div className={classNames(styles.movieContainer, { [styles.listMovieContainer]: !isCardView })}>
                                {
                                    data.filter((movie) => {
                                        if (activeGenre === 'all') {
                                            return true;
                                        }
                                        return movie.genres.includes(activeGenre);
                                    }).map((movie) => {
                                        const { img, name, year, id } = movie;
                                        const isAddedMovie = checkIsLocalStorageItem(movies, id);
                                        return (
                                            <div className={styles.movie} key={id + name} >
                                                {
                                                    isCardView
                                                        ? <CardItem
                                                            img={img}
                                                            name={name}
                                                            year={year}
                                                            handleOpenModal={handleOpenModal(id)}
                                                            handleAddToFavorites={handleAddToFavorites(movie)}
                                                            handleRemoveFromFavorites={handleRemoveFromFavorites(id)}
                                                            isAddedMovie={isAddedMovie}
                                                        />
                                                        : <ListItem
                                                            movie={movie}
                                                            handleOpenModal={handleOpenModal(id)}
                                                            handleAddToFavorites={handleAddToFavorites(movie)}
                                                            handleRemoveFromFavorites={handleRemoveFromFavorites(id)}
                                                            isAddedMovie={isAddedMovie}
                                                        />
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        )
                        : (
                            <div className={styles.loadingWrapper}>
                                <div className={styles.loadingText}>Loading...</div>
                            </div>
                        )
                }
            </div>
            {
                isModalOpened &&
                <ModalWindow
                    activeMovieId={activeMovieId}
                    handleCloseModal={handleCloseModal}
                    handleAddToFavorites={handleAddToFavorites}
                    handleRemoveFromFavorites={handleRemoveFromFavorites}
                />
            }
        </div>
    );
};

export default Home;