 // Dice.js
// This module manages dice rolling, locking, and UI updates.

export class Dice {
    constructor() {
        this.keptDice = [false, false, false, false, false]; // Tracks locked dice
        this.rollCount = 3; // Remaining rolls per turn
        this.updateRollButton(); // Initialize the roll button text
    }

    /**
     * Rolls dice by fetching values from the server for unlocked dice.
     * Updates the dice visuals and decrements the roll count.
     */
    roll() {
        if (this.rollCount === 0) {
            alert("No rolls left! Reset to start a new turn.");
            return; // Prevent rolling when no rolls are left
        }

        fetch(`${window.location.origin}/roll-dices`)
            .then(response => response.json())
            .then(diceValues => {
                const updatedDice = diceValues.map((value, index) =>
                    this.keptDice[index]
                        ? parseInt(document.getElementById(`die${index + 1}`).getAttribute('data-value')) // Keep locked dice
                        : value // Update unlocked dice
                );

                this.updateDiceImages(updatedDice); // Update dice visuals
                this.rollCount--; // Decrement roll count
                this.updateRollButton(); // Update the roll button text
            }).catch(error => console.error("Failed to roll dice:", error));
    }

    /**
     * Resets the dice rolls and unlocks all dice for a new turn.
     */
    resetRolls() {
        this.rollCount = 3; // Reset roll count
        this.keptDice.fill(false); // Unlock all dice
        this.updateRollButton(); // Update the roll button text
    }

    /**
     * Updates the dice images in the UI based on the current dice values.
     * @param {Array<number>} diceValues - The values of the dice (1-6).
     */
    updateDiceImages(diceValues) {
        diceValues.forEach((value, index) => {
            const die = document.getElementById(`die${index + 1}`);
            die.src = `images/dice${value}.png`; // Update dice image
            die.setAttribute('data-value', value); // Update dice value attribute
        });
    }

    /**
     * Updates the roll button text to reflect the remaining rolls.
     */
    updateRollButton() {
        document.getElementById('roll-button').innerText = `Roll Dice (${this.rollCount} Rolls Left)`;
    }
}
