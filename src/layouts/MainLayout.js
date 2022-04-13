import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div>
        {children}
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.object
}

export default MainLayout;
