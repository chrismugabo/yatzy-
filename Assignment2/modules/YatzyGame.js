 // YatzyGame.js
// This module controls the overall game state, such as starting a new game or updating the score.

import { Dice } from './Dice.js';
import { YatzyEngine } from './YatzyEngine.js';

export class YatzyGame {
    constructor() {
        this.dice = new Dice();
        this.engine = new YatzyEngine();
        this.totalScore = 0;
        this.scoreLocked = false; // Flag to prevent multiple score locks per turn
    }

    startNewGame() {
        this.totalScore = 0;
        this.engine.resetLockedCategories();
        this.dice.resetRolls();
        this.scoreLocked = false; // Reset score lock flag for new game
    }

    startNewTurn() {
        this.dice.resetRolls();
        this.scoreLocked = false; // Allow one score lock per turn
    }

    resetGame() {
        this.startNewGame();
    }

    updateScore(category) {
        // Prevent multiple score locks per turn
        if (this.scoreLocked) {
            alert("You've already locked a score for this turn. Roll the dice for a new turn.");
            return;
        }

        const diceValues = Array.from(document.querySelectorAll('.die')).map(die =>
            parseInt(die.getAttribute('data-value'))
        );

        const score = this.engine.calculateScore(category, diceValues);

        if (!(category in this.engine.lockedCategories)) {
            this.engine.lockCategoryScore(category, score);
            this.totalScore += score;

            // Update UI to display locked score for the selected category
            document.getElementById(`score-${category}`).innerText = score;
            document.getElementById('score-total').innerText = this.totalScore;

            // Set flag to prevent locking multiple categories in the same turn
            this.scoreLocked = true;
        }
    }

    displayPossibleScores() {
        const diceValues = Array.from(document.querySelectorAll('.die')).map(die =>
            parseInt(die.getAttribute('data-value'))
        );

        Object.keys(this.engine.score).forEach(category => {
            if (!(category in this.engine.lockedCategories)) {
                const score = this.engine.calculateScore(category, diceValues);
                document.getElementById(`score-${category}`).innerText = score;
            }
        });
    }
}

