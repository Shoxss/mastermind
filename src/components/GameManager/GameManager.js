import React from 'react';
import PropTypes from 'prop-types';
import styles from './GameManager.module.css';

const GameManager = () => (
  <div className={styles.GameManager} data-testid="GameManager">
    GameManager Component
  </div>
);

GameManager.propTypes = {};

GameManager.defaultProps = {};

export default GameManager;
