import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import { LOCAL_STORAGE_KEYS } from '../../constants';

import styles from './styles.module.scss';

const selectStyles = {
    control: (style) => ({
        ...style,
        background: 'none',
        borderRadius: 6,
        fontSize: 12,
        minHeight: 'none',
        height: 35,
        width: 200,
        border: 0,
        boxShadow: 'none',
        alignContent: 'center',
        cursor: 'pointer'
    }),
    singleValue: style => ({
        ...style,
    }),
    dropdownIndicator: (style) => ({
        ...style,
        border: 'none',
        '& path': {
            fill: 'rgb(198, 209, 255)'
        },
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 5,
        paddingLeft: 3
    }),
    indicatorSeparator: style => ({
        ...style,
        display: 'none'
    }),
    menu: style => ({
        ...style,
        minWidth: 150,
        right: 0,
        zIndex: 5
    }),
    valueContainer: style => ({
        ...style,
        padding: 0,
        paddingLeft: 2
    }),
    option: (style, { isFocused, isSelected }) => ({
        ...style,
        backgroundColor: isSelected ? 'rgb(198, 209, 255)' : isFocused ? 'rgb(198, 209, 255, 0.2)' : 'white'
    })
};

const SelectGenreTool = ({ data, label, onChange }) => {
    const localStorageGenre = localStorage.getItem(LOCAL_STORAGE_KEYS.GENRE);
    return (
        <div className={styles.wrapper} >
            <span className={styles.label}>{label}</span>
            <Select
                defaultValue={
                    localStorageGenre
                        ? { value: localStorageGenre, label: localStorageGenre }
                        :  data[0]
                }
                onChange={onChange}
                options={data}
                styles={selectStyles}
                className={styles.select}
            />
        </div>
    );
};

SelectGenreTool.propTypes = {
    data: PropTypes.array,
    label: PropTypes.string,
    onChange: PropTypes.func
};
SelectGenreTool.defaultProps = {
    onChange: () => {},
    data: [],
    label: ''
};

export default SelectGenreTool;
