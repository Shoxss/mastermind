import React from "react";
import styles from './GameManager.module.css';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import GAME_CONFIG from '../../constants/gameConfig.json';
import CONSTANTS from '../../constants/strings.json';

const COLOR_PALETTE = GAME_CONFIG.COLORS.PASTEL;

class GameManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guesses: [],
      showAlert: false,
      alertMessage: '',
      alertVariant: ''
    };
  }

  handleColorClick(color) {
    if (this.state.guesses.length < 4) {
      const guess = <Card key={this.state.guesses.length} className={styles.GuessColor} style={{backgroundColor: COLOR_PALETTE[color]}}/>;
      this.setState({ guesses: [guess, ...this.state.guesses].reverse() });
    }
  }

  handleClearClick() {
    this.setState({ guesses: [] });
    this.setState({ showAlert: false });
  }

  handleSubmitClick() {
    // Clear previous alert
    this.setState({ showAlert: false });

    if (this.state.guesses.length < 4) {
      this.setState({ alertMessage: CONSTANTS.ALERT.GUESS_COUNT, alertVariant: 'warning', showAlert: true });
    } else {
      // Call controller to submit
      // Check response
      // Increment attempt counter, show lose modal if max attempts or show win modal if guess right
    }
  }

  render() {
    return (
      <div className={styles.GameManager} data-testid="GameManager">
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
      </div>
    );
  }
}

export default GameManager;
