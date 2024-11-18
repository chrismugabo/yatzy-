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
     * Updates the dice values in the game state.
     * @param {Array} diceValues - The array of dice values received from the server.
     */
    updateDice(diceValues) {
        console.log('Updating dice values in YatzyGame:', diceValues); // Debugging log
        this.dice.values = diceValues; // Update dice values in the Dice instance
    }

    /**
     * Resets the game state and synchronizes with the server.
     */
    resetGame() {
        console.log('Resetting game state...'); // Debug log

        // Reset local state
        this.totalScore = 0;
        this.dice.resetRolls();
        this.engine.resetLockedCategories();
        this.scoreLocked = false;

        // Update the server
        fetch(`${window.location.origin}/game-state`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reset: true }),
        })
            .then(() => console.log('Game state reset on server'))
            .catch(error => console.error('Failed to reset game state on server:', error));

        // Reset button text to "Roll Dice"
        document.getElementById('roll-button').innerText = 'Roll Dice';
    }

    /**
     * Updates the score for a selected category based on the current dice values.
     * Sends the calculation task to the server.
     * @param {string} category - The category to lock the score for.
     */
    updateScore(category) {
        if (this.scoreLocked) {
            alert("You've already locked a score for this turn.");
            return; // Prevent multiple score locks in one turn
        }

        const diceValues = Array.from(document.querySelectorAll('.die')).map(die =>
            parseInt(die.getAttribute('data-value'))
        );

        // Call the server to calculate the score
        fetch(`${window.location.origin}/calculate-score`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, diceValues }),
        })
            .then(response => response.json())
            .then(data => {
                const score = data.score;

                // Lock the score if the category is not already locked
                if (!(category in this.engine.lockedCategories)) {
                    this.engine.lockCategoryScore(category, score); // Save score to the server
                    this.totalScore += score; // Update total score locally

                    // Update the UI with the locked score and total score
                    document.getElementById(`score-${category}`).innerText = score;
                    document.getElementById('score-total').innerText = this.totalScore;

                    this.scoreLocked = true; // Prevent additional score locks in this turn
                }
            })
            .catch(error => console.error('Error calculating score:', error));
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
