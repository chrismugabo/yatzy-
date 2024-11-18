 // YatzyEngine.js
// This module manages score calculation for each category and handles locked categories.

export class YatzyEngine {
    constructor() {
        // Initialize scores for all categories to null
        this.score = {
            ones: null, twos: null, threes: null, fours: null, fives: null, sixes: null,
            threeKind: null, fourKind: null, fullHouse: null, smallStraight: null,
            largeStraight: null, chance: null, yatzy: null
        };
        // Track locked categories and their scores
        this.lockedCategories = {};
    }

    // Calculates score based on the category selected and the dice values
    calculateScore(category, diceValues) {
        let counts = new Array(6).fill(0); // Frequency count for dice values (1-6)
        diceValues.forEach(die => counts[die - 1]++);

        // Calculate score based on category rules
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
            case "chance": return diceValues.reduce((a, b) => a + b);
            default: return 0;
        }
    }

    // Locks a score in a category so it cannot be selected again
    lockCategoryScore(category, score) {
        if (!(category in this.lockedCategories)) {
            this.lockedCategories[category] = score;
        }
    }

    // Resets locked categories for a new game
    resetLockedCategories() {
        this.lockedCategories = {};
    }
}
