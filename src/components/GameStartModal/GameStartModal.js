import React, { useState } from "react";
import styles from './GameStartModal.module.css';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import BrainLogo from '../BrainLogo/BrainLogo';
import constants from '../../constants/strings.json';


const GameStartModal = () => {
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);

  return (
    <Modal backdrop="static" show={show} onHide={handleClose}>
      <Modal.Body className={[styles.BackgroundDark,styles.ModalBody]}>
        <h1 className={styles.GameTitle}>{constants.GAME_NAME}</h1>
        <br/>
        <BrainLogo></BrainLogo>
        <br/>
        <h5 className={styles.TextWhite}>{constants.GAME_RULES}</h5>
        <p className={styles.TextWhite}>{constants.GAME_RULES_DESCRIPTION}</p>
      </Modal.Body>
      <Modal.Footer className={styles.BackgroundDark}>
        <Button className={styles.PlayButton} variant="success" onClick={handleClose}>{constants.BUTTON.PLAY}</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default GameStartModal;
