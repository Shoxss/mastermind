import React from "react";
import styles from './GameManager.module.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';

import GameController from '../../controllers/GameController';

import GAME_CONFIG from '../../constants/gameConfig.json';
import CONSTANTS from '../../constants/strings.json';

const COLOR_PALETTE = GAME_CONFIG.COLORS.PASTEL;

class GameManager extends React.Component {
  constructor(props) {
    super(props);
    this.gameController = new GameController();
    this.state = {
      gameId: null,
      guessColors: new Set(),
      guesses: new Set(),
      showAlert: false,
      alertMessage: '',
      alertVariant: '',
      showEnd: false,
      won: false,
      lost: false,

    };
    this.setState({ gameId: this.gameController.createGame() });
  }

  /**
   * @description Handles clicking of color option by adding to list of guesses and updating state.
   * @param {String} color 
   */
  handleColorClick(color) {
    if (this.state.guesses.size < 4) {
      const guess = <Card key={this.state.guesses.size} className={styles.GuessColor} style={{backgroundColor: COLOR_PALETTE[color]}}/>;

      let updatedGuesses = this.state.guesses;
      updatedGuesses.add(guess);
      this.setState({ guesses: updatedGuesses });

      let updatedGuessColors = this.state.guessColors;
      updatedGuessColors.add({ key: updatedGuessColors.size, color: color.toLowerCase() }); // Adding as object with key to make unique
      this.setState({ guessColors: updatedGuessColors });
    }
  }

  /**
   * @description Handles clearing of guesses
   */
  handleClearClick() {
    this.setState({ guesses: new Set(), guessColors: new Set() });
  }

  /**
   * @description Handles submission of guesses
   */
  handleSubmitClick() {
    // Clear previous alert
    this.setState({ showAlert: false });
    // Validate guess
    if (this.state.guesses.size < 4) {
      this.setState({ alertMessage: CONSTANTS.ALERT.GUESS_COUNT, alertVariant: 'warning', showAlert: true });
    } else {
      this.gameController.makeGuess(this.state.gameId, [...Array.from(this.state.guessColors).map((guessColor) => guessColor.color)]).then((response) => {
        if (response.correct === 4) {
          this.setState({ showEnd: true, won: true });
        } else if (response.turns_left === 0) {
          this.setState({ showEnd: true, lost: true });
        } else {
          this.setState({ alertMessage: 'Close: ' + response.close + ' Correct: ' + response.correct + ' Attempts left: ' + response.turns_left, alertVariant: 'info', showAlert: true });
        }
      });
    }
  }

  /**
   * @description Restarts game
   */
  handlePlayAgain() {
    // Simply just refresh
    // TODO: Add more elegant way to restart game
    window.location.reload(false);
  }

  render() {
    return (
      <div className={styles.GameManagerContainer} data-testid="GameManager">
        <div className={styles.GameManager}>
          <Button variant="outline-info" className={styles.GameColor} style={{backgroundColor: COLOR_PALETTE.BLUE}} onClick={() => this.handleColorClick('BLUE')}/>
          <Button variant="outline-info" className={styles.GameColor} style={{backgroundColor: COLOR_PALETTE.RED}} onClick={() => this.handleColorClick('RED')}/>
          <Button variant="outline-info" className={styles.GameColor} style={{backgroundColor: COLOR_PALETTE.BLACK}} onClick={() => this.handleColorClick('BLACK')}/>
          <Button variant="outline-info" className={styles.GameColor} style={{backgroundColor: COLOR_PALETTE.PINK}} onClick={() => this.handleColorClick('PINK')}/>
          <Button variant="outline-info" className={styles.GameColor} style={{backgroundColor: COLOR_PALETTE.YELLOW}} onClick={() => this.handleColorClick('YELLOW')}/>
          <Button variant="outline-info" className={styles.GameColor} style={{backgroundColor: COLOR_PALETTE.WHITE}} onClick={() => this.handleColorClick('WHITE')}/>
          <Button variant="outline-info" className={styles.GameColor} style={{backgroundColor: COLOR_PALETTE.ORANGE}} onClick={() => this.handleColorClick('ORANGE')}/>
          <Button variant="outline-info" className={styles.GameColor} style={{backgroundColor: COLOR_PALETTE.GREEN}} onClick={() => this.handleColorClick('GREEN')}/>
          <Button variant="outline-info" className={styles.GameColor} style={{backgroundColor: COLOR_PALETTE.PURPLE}} onClick={() => this.handleColorClick('PURPLE')}/>

          <div className={styles.GuessListTitleContainer}>
            <h1 className={styles.GuessListTitle}>{CONSTANTS.GUESS_TITLE}</h1>
            <Button variant="secondary" className={styles.GuessListClear} onClick={() => this.handleClearClick()}>{CONSTANTS.BUTTON.CLEAR}</Button>
          </div>

          <div className={styles.GuessList}>{this.state.guesses}</div>

          <Button variant="success" className={styles.GuessSubmit} onClick={() => this.handleSubmitClick()}>{CONSTANTS.BUTTON.SUBMIT}</Button>

          <Alert show={this.state.showAlert} variant={this.state.alertVariant} className={styles.Alert} >{this.state.alertMessage}</Alert>

          <Modal backdrop="static" show={this.state.won}>
            <Modal.Body className={[styles.BackgroundDark,styles.ModalBody]}>
              <h1 className={styles.WinLoseText}>{CONSTANTS.ALERT.WIN}</h1>
            </Modal.Body>
            <Modal.Footer className={styles.BackgroundDark}>
              <Button className={styles.PlayAgainButton} variant="success" onClick={() => this.handlePlayAgain()}>{CONSTANTS.BUTTON.PLAY_AGAIN}</Button>
            </Modal.Footer>
          </Modal>

          <Modal backdrop="static" show={this.state.lost}>
            <Modal.Body show={this.state.lost} className={[styles.BackgroundDark,styles.ModalBody]}>
              <h1 className={styles.WinLoseText}>{CONSTANTS.ALERT.LOSE}</h1>
            </Modal.Body>
            <Modal.Footer className={styles.BackgroundDark}>
              <Button className={styles.PlayAgainButton} variant="success" onClick={() => this.handlePlayAgain()}>{CONSTANTS.BUTTON.PLAY_AGAIN}</Button>
            </Modal.Footer>
          </Modal>

          <p className={styles.Cheater}>Psst... the answer is in the console. You know, if you're a cheater.</p>
        </div>

      </div>
    );
  }
}

export default GameManager;
