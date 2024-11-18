 // YatzyGame.js
// This module manages the overall game state, such as starting a new game, managing turns,
// updating scores, and interacting with the server.

import { Dice } from './Dice.js';
import { YatzyEngine } from './YatzyEngine.js';

export class YatzyGame {
    constructor() {
        this.dice = new Dice(); // Handles dice rolling
        this.engine = new YatzyEngine(); // Handles score calculations
        this.totalScore = 0; // Tracks the total score for the game
        this.scoreLocked = false; // Prevents multiple scores from being locked in one turn
    }

    /**
     * Starts a new game by resetting the game state and syncing with the server.
     */
    startNewGame() {
        this.totalScore = 0;
        this.engine.resetLockedCategories(); // Reset locked categories
        this.dice.resetRolls(); // Reset dice rolls
        this.scoreLocked = false; // Allow scoring for the first turn

        // Inform the server to reset the game state
        fetch(`${window.location.origin}/game-state`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reset: true }),
        }).catch(error => console.error('Failed to reset game state on server:', error));
    }

    /**
     * Starts a new turn by resetting the dice rolls and unlocking the score lock.
     */
    startNewTurn() {
        this.dice.resetRolls(); // Reset dice rolls
        this.scoreLocked = false; // Allow scoring for this turn
    }

    /**
     * Updates the score for a selected category based on the current dice values.
     * Locks the score on the server to ensure persistence.
     * @param {string} category - The category to lock the score for.
     */
    updateScore(category) {
        if (this.scoreLocked) {
            alert("You've already locked a score for this turn.");
            return; // Prevent multiple score locks in one turn
        }

        // Get the current dice values from the UI
        const diceValues = Array.from(document.querySelectorAll('.die')).map(die =>
            parseInt(die.getAttribute('data-value'))
        );

        // Calculate the score for the selected category
        const score = this.engine.calculateScore(category, diceValues);

        // Lock the score if the category is not already locked
        if (!(category in this.engine.lockedCategories)) {
            this.engine.lockCategoryScore(category, score); // Save score to the server
            this.totalScore += score; // Update total score locally

            // Update the UI with the locked score and total score
            document.getElementById(`score-${category}`).innerText = score;
            document.getElementById('score-total').innerText = this.totalScore;

            this.scoreLocked = true; // Prevent additional score locks in this turn
        }
    }

    /**
     * Displays possible scores for all unlocked categories based on the current dice values.
     */
    displayPossibleScores() {
        const diceValues = Array.from(document.querySelectorAll('.die')).map(die =>
            parseInt(die.getAttribute('data-value'))
        );

        // Calculate and display possible scores for each category
        Object.keys(this.engine.score).forEach(category => {
            if (!(category in this.engine.lockedCategories)) {
                const score = this.engine.calculateScore(category, diceValues);
                document.getElementById(`score-${category}`).innerText = score;
            }
        });
    }
}
