import React from "react";
import CONFIG from '../constants/gameConfig.json';

class GameController extends React.Component {

    constructor() {
        super();
        this.attemptsLeft = 10;
        this.answer = this.generateMockAnswer();
    }

    /**
     * @description Send create game request to mastermind endpoint.
     * @returns {Object} Response
     */
    async createGame() {
        const options = {
            method: 'POST',
            mode: 'no-cors',
        };
        // const response = await fetch(CONFIG.ENDPOINT_URL + '/create', options).then(res => res.json());
        // return response;

        return this.mockCreateGameEndpoint();
    };

    /**
     * @description Sends guess as POST request to mastermind endpoint
     * @param {String} gameId 
     * @param {Array} guess 
     * @returns {Object} Response
     */
    async makeGuess(gameId, guess) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ guess })
        };
        // const response = await fetch(CONFIG.ENDPOINT_URL + '/game/' + gameId + '/guess', options).then(res => res.json());
        // return response;

        return this.mockGuessEndpoint(guess);
    }

    /**
     * @description Mocks mastermind guess endpoint logic for local testing.
     *              Endpoint not reachable due to cors.
     * @param {Array} guess 
     * @returns {Object}
     */
    mockGuessEndpoint(guess) {
        this.attemptsLeft--;
        let close = 0;
        let correct = 0;

        const verifiedGuess = [];
        const verifiedAnswer = [];
        for (let i = 0; i < 4; i++) {
            if (!verifiedAnswer.includes(i) && !verifiedGuess.includes(i)) {
                if (this.answer[i] === guess[i]) {
                    correct++;
                    verifiedAnswer.push(i);
                    verifiedGuess.push(i);
                }
            }
        }
        for (let i = 0; i < 4; i++) {
            if (!verifiedGuess.includes(i)) {
                for (let j = 0; j < 4; j++) {
                    if (!verifiedAnswer.includes(j)) {
                        if (this.answer[j] === guess[i]) {
                            close++;
                            verifiedAnswer.push(j);
                            verifiedGuess.push(i);
                        }
                    }
                }
            }
        }

        return {
            close,
            correct,
            turns_left: this.attemptsLeft
        };
    }

    /**
     * @description Mocks mastermind create endpoint logic for local testing.
*                   Endpoint not reachable due to cors.
     * @returns {Object}
     */
    mockCreateGameEndpoint() {
        return { game_id: '12345' };
    }

    /**
     * @description Generate a random answer
     * @returns {Array}
     */
    generateMockAnswer() {
        const answer = [];
        const possibleColors = [
            'blue',
            'red',
            'yellow',
            'black',
            'green',
            'white',
            'orange',
            'purple',
            'pink',
        ];
        for (let i = 0; i < 4; i++) {
            answer.push(possibleColors[Math.floor(Math.random() * 8)]);
        }
        console.log('Answer: ' + answer);
        return answer;
    }
};

export default GameController;