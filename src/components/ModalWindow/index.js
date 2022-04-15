import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import StarOutlinedIcon from '../../images/star-outlined.svg';
import StarIcon from '../../images/star.svg';

import styles from './styles.module.scss';

const ModalWindow = ({ activeMovieId, handleCloseModal, handleAddToFavourite }) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(`https://my-json-server.typicode.com/moviedb-tech/movies/list/${activeMovieId}`)
            .then(res => res.json())
            .then(data => setData(data))
            .catch(() => { });
    }, [activeMovieId]);
    return (
        <div className={styles.modal} onClick={handleCloseModal}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()} >
                {
                    data
                        ? (
                            <div className={styles.contentWrapper}>
                                <img src={StarOutlinedIcon} alt='star-icon' className={styles.starIcon} onClick={handleAddToFavourite(data.id)} />
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
    handleAddToFavourite: PropTypes.func
};

export default ModalWindow;
