import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { LOCAL_STORAGE_KEYS, DISPLAY_TYPES } from '../../constants';

import ListIcon from '../../assets/list.svg';
import CardIcon from '../../assets/card.svg';

import styles from './styles.module.scss';

const DisplayTool = ({ setTypeView, isCardView }) => {
    const handleChangeMoviesView = (view) => () => {
        setTypeView(view);
        localStorage.setItem(LOCAL_STORAGE_KEYS.VIEW, view);
    };

    return (
        <div className={styles.wrapper}>
            <div>View as:</div>
            <div
                onClick={handleChangeMoviesView(DISPLAY_TYPES.CARD)}
            >
                <CardIcon className={classNames(styles.button, { [styles.activeCardButton]: isCardView })}/>
            </div>
            <div
                onClick={handleChangeMoviesView(DISPLAY_TYPES.LIST)}
            >
                <ListIcon className={classNames(styles.button, { [styles.activeListButton]: !isCardView })} />
            </div>
        </div>
    );
};

DisplayTool.propTypes = {
    setTypeView: PropTypes.func,
    isCardView: PropTypes.bool
};
DisplayTool.defaultProps = {
    setTypeView: () => { }
};

export default DisplayTool;
