import { YatzyGame } from './modules/YatzyGame.js';

const game = new YatzyGame();

// Update the roll button text dynamically
function updateRollButton() {
    document.getElementById('roll-button').innerText = `Roll Dice (${game.dice.rollCount} Rolls Left)`;
}

// Update dice images dynamically
function updateDiceUI(diceValues) {
    diceValues.forEach((value, index) => {
        const dieElement = document.getElementById(`die${index + 1}`);
        dieElement.src = `images/dice${value}.png`;
        dieElement.setAttribute('data-value', value);
    });
}

// Roll Dice
document.getElementById('roll-button').addEventListener('click', async () => {
    const response = await fetch('/roll-dice', { method: 'POST' });
    const data = await response.json();
    game.updateDice(data.diceValues);
    updateDiceUI(data.diceValues);
    updateRollButton();
    game.displayPossibleScores();
});

// Reset Game
document.getElementById('reset-button').addEventListener('click', async () => {
    await fetch('/game-state', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dice: [], score: 0 }),
    });

    game.resetGame();
    resetUI();
});

// Reset UI
function resetUI() {
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
        const score = game.calculateScoreForCategory(category);

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
    });
});
