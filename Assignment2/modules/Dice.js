 // Dice.js
// This module handles dice rolling, dice locking, and updating dice visuals.

export class Dice {
    constructor() {
        this.keptDice = [false, false, false, false, false]; // Tracks which dice are locked
        this.rollCount = 3; // Initial roll count
        this.updateRollButton(); // Initialize the button text
    }

     // Rolls dice by fetching values from the server for unlocked dice
roll() {
    console.log("Starting roll function with rollCount:", this.rollCount);

    // Check if rollCount is zero before attempting to fetch dice values
    if (this.rollCount === 0) {
        console.log("No rolls left, triggering alert at the start of roll function.");
        alert("No rolls left! Select a category or reset for the next turn.");
        return; // Exit the function to prevent any further code execution
    } 

    // Only proceed if rolls are available
    fetch('http://localhost:3000/roll-dices') 
        .then(response => {
            console.log("Received response from server:", response); // Debugging log for response
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(diceValues => {
            console.log("Dice values received from server:", diceValues);

            // Update visuals only for unlocked dice
            const updatedDiceValues = diceValues.map((value, index) =>
                this.keptDice[index]
                    ? parseInt(document.getElementById(`die${index + 1}`).getAttribute('data-value'))
                    : value
            );

            // Update dice images
            this.updateDiceImages(updatedDiceValues);

            // Only now decrement the roll count
            this.rollCount--;
            console.log("Roll count after decrement:", this.rollCount);

            // Update the roll button text after decrement
            this.updateRollButton();

            // Check if rolls are over only after decrementing and updating
            if (this.rollCount === 0) {
                console.log("No rolls left, triggering alert after decrement.");
                alert("No rolls left! Select a category or reset for the next turn.");
            } else {
                console.log(`Rolls remaining: ${this.rollCount}`);
            }
        })
        .catch(error => {
            console.error("Error fetching dice values:", error);
            alert("Failed to roll dice. Please try again.");
        });
}


    // Resets roll count and unlocks all dice for the next turn
    resetRolls() {
        this.rollCount = 3; // Reset roll count to 3
        this.keptDice = [false, false, false, false, false]; // Unlock all dice
        this.updateRollButton(); // Update the button text
        console.log("Rolls reset. Roll count is now:", this.rollCount); // Confirm reset count
    }

    // Toggles the lock status of a specific die
    toggleDieLock(dieIndex) {
        this.keptDice[dieIndex] = !this.keptDice[dieIndex];
        console.log(`Die ${dieIndex + 1} lock status:`, this.keptDice[dieIndex]); // Debug log for locking
    }

    // Updates the dice images based on the current dice values
    updateDiceImages(diceValues) {
        for (let i = 0; i < 5; i++) {
            const dieElement = document.getElementById(`die${i + 1}`);
            dieElement.src = `images/dice${diceValues[i]}.png`;
            dieElement.setAttribute('data-value', diceValues[i]);
            console.log(`Updated Die ${i + 1} to value:`, diceValues[i]); // Debug log for dice values
        }
    }

    // Updates the roll button text to show the remaining rolls
    updateRollButton() {
        const rollButton = document.getElementById('roll-button');
        rollButton.textContent = `Roll Dice (${this.rollCount} Rolls Left)`;
        console.log("Updated roll button text:", rollButton.textContent); // Debug log for button update
    }
}
