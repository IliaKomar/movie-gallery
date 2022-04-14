import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { LOCAL_STORAGE_KEYS, DISPLAY_TYPES } from '../../constants';

import ListIcon from '../../images/list.svg';
import CardIcon from '../../images/card.svg';

import styles from './styles.module.scss';

const DisplayTool = ({ setTypeView, isCardView }) => {
    const handleChangeMoviesView = (view) => () => {
        setTypeView(view);
        localStorage.setItem(LOCAL_STORAGE_KEYS.VIEW, view);
    };

    return (
        <div className={styles.wrapper}>
            <div>View as:</div>
            <img
                src={CardIcon}
                onClick={handleChangeMoviesView(DISPLAY_TYPES.CARD)}
                className={classNames(styles.button, { [styles.activeCardButton]: isCardView })}
            />
            <img
                src={ListIcon}
                onClick={handleChangeMoviesView(DISPLAY_TYPES.LIST)}
                className={classNames(styles.button, { [styles.activeListButton]: !isCardView })}
            />
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
