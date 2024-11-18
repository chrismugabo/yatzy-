 // YatzyEngine.js
// This module calculates scores for each category and manages locked categories.

export class YatzyEngine {
    constructor() {
        this.score = {
            ones: null, twos: null, threes: null, fours: null, fives: null, sixes: null,
            threeKind: null, fourKind: null, fullHouse: null, smallStraight: null,
            largeStraight: null, chance: null, yatzy: null
        };
        this.lockedCategories = {}; // Stores locked categories and their scores
    }

    /**
     * Calculates the score for a given category based on the dice values.
     * @param {string} category - The Yatzy category (e.g., "ones", "fullHouse").
     * @param {Array<number>} diceValues - Array of dice values (1-6).
     * @returns {number} - The calculated score for the category.
     */
    calculateScore(category, diceValues) {
        let counts = new Array(6).fill(0); // Frequency of each dice value
        diceValues.forEach(die => counts[die - 1]++);

        // Calculate the score based on category rules
        switch (category) {
            case "ones": return counts[0] * 1;
            case "twos": return counts[1] * 2;
            case "threes": return counts[2] * 3;
            case "fours": return counts[3] * 4;
            case "fives": return counts[4] * 5;
            case "sixes": return counts[5] * 6;
            case "threeKind": return counts.some(count => count >= 3) ? diceValues.reduce((a, b) => a + b) : 0;
            case "fourKind": return counts.some(count => count >= 4) ? diceValues.reduce((a, b) => a + b) : 0;
            case "fullHouse": return counts.includes(3) && counts.includes(2) ? 25 : 0;
            case "smallStraight": return counts.slice(0, 5).every(count => count > 0) ? 30 : 0;
            case "largeStraight": return counts.slice(1, 6).every(count => count > 0) ? 40 : 0;
            case "yatzy": return counts.some(count => count === 5) ? 50 : 0;
            case "chance": return diceValues.reduce((a, b) => a + b);
            default: return 0;
        }
    }

    /**
     * Locks a score for a category and persists it on the server.
     * @param {string} category - The category to lock.
     * @param {number} score - The score to lock for the category.
     */
    lockCategoryScore(category, score) {
        if (category in this.lockedCategories) return;

        fetch(`${window.location.origin}/game-state`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category, score }),
        }).then(() => {
            this.lockedCategories[category] = score; // Update locally after successful server save
        }).catch(error => console.error(`Failed to lock category ${category}:`, error));
    }

    /**
     * Resets all locked categories for a new game.
     */
    resetLockedCategories() {
        this.lockedCategories = {};
    }
}
