import { YatzyGame } from './modules/YatzyGame.js';
console.log('main.js is loaded!');

const game = new YatzyGame();

// Update the roll button text dynamically
function updateRollButton() {
    document.getElementById('roll-button').innerText = `Roll Dice`;
}

// Update dice images dynamically
function updateDiceUI(diceValues) {
    console.log('Updating dice UI with values:', diceValues); // Debug log
    diceValues.forEach((value, index) => {
        const dieElement = document.getElementById(`die${index + 1}`);
        dieElement.src = `images/dice${value}.png`;
        dieElement.setAttribute('data-value', value);
    });
}

// Roll Dice
document.getElementById('roll-button').addEventListener('click', async () => {
    console.log('Roll button clicked!'); // Debug log
    try {
        const response = await fetch('/roll-dice', { method: 'POST' });
        const data = await response.json();
        console.log('Dice values received from server:', data.diceValues); // Debug log
        game.updateDice(data.diceValues);
        updateDiceUI(data.diceValues);
        updateRollButton();
        game.displayPossibleScores();
    } catch (error) {
        console.error('Error rolling dice:', error); // Debug log for errors
    }
});

// Reset Game
document.getElementById('reset-button').addEventListener('click', async () => {
    console.log('Reset button clicked!'); // Debug log
    try {
        await fetch('/game-state', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dice: [], score: 0 }),
        });
        game.resetGame();
        resetUI();
    } catch (error) {
        console.error('Error resetting game state:', error); // Debug log for errors
    }
});

// Reset UI
function resetUI() {
    console.log('Resetting UI...'); // Debug log
    updateRollButton();
    document.getElementById('score-total').innerText = "0";

    categories.forEach(category => {
        document.getElementById(`score-${category}`).innerText = "0";
        document.getElementById(`score-${category}`).classList.remove('selected');
    });
}

// Score Categories
const categories = [
    'ones', 'twos', 'threes', 'fours', 'fives', 'sixes',
    'threeKind', 'fourKind', 'fullHouse', 'smallStraight',
    'largeStraight', 'chance', 'yatzy'
];

categories.forEach(category => {
    document.getElementById(`score-${category}`).addEventListener('click', async () => {
        console.log(`Category ${category} clicked!`); // Debug log
        try {
            const score = game.calculateScoreForCategory(category);
            console.log(`Calculated score for ${category}:`, score); // Debug log
            await fetch('/game-state', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dice: game.dice.values,
                    score: score,
                }),
            });
            game.updateScore(category);
            document.getElementById(`score-${category}`).classList.add('selected');
            game.startNewTurn();
        } catch (error) {
            console.error(`Error updating score for category ${category}:`, error); // Debug log
        }
    });
});
