import { YatzyGame } from './modules/YatzyGame.js';

const game = new YatzyGame();

function updateRollButton() {
    document.getElementById('roll-button').innerText = `Roll Dice (${game.dice.rollCount} Rolls Left)`;
}

document.getElementById('roll-button').addEventListener('click', () => {
    game.dice.roll(); // Directly call roll without expecting a return value
    updateRollButton(); // Update the button text
    
    // Display possible scores for the new roll
    game.displayPossibleScores();
});

document.getElementById('reset-button').addEventListener('click', () => {
    game.resetGame();
    resetUI();
});

function resetUI() {
    updateRollButton();
    document.getElementById('score-total').innerText = "0";

    const categories = [
        'ones', 'twos', 'threes', 'fours', 'fives', 'sixes',
        'threeKind', 'fourKind', 'fullHouse', 'smallStraight',
        'largeStraight', 'chance', 'yatzy'
    ];

    categories.forEach(category => {
        document.getElementById(`score-${category}`).innerText = "0";
        document.getElementById(`score-${category}`).classList.remove('selected');
    });
}

const categories = [
    'ones', 'twos', 'threes', 'fours', 'fives', 'sixes',
    'threeKind', 'fourKind', 'fullHouse', 'smallStraight',
    'largeStraight', 'chance', 'yatzy'
];

categories.forEach(category => {
    document.getElementById(`score-${category}`).addEventListener('click', () => {
        game.updateScore(category);
        
        // Visually lock the category and start a new turn
        document.getElementById(`score-${category}`).classList.add('selected');
        game.startNewTurn(); // Prepare for the next roll cycle
    });

});
