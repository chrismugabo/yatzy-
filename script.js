 // Game state variables
let keptDice = [false, false, false, false, false]; // Tracks which dice are locked
let rollCount = 3;
let totalScore = 0;
let selectedCategory = null;
let lockedCategories = {}; // Store locked categories and their scores
let score = {
    ones: null,
    twos: null,
    threes: null,
    fours: null,
    fives: null,
    sixes: null,
    threeKind: null,
    fourKind: null,
    fullHouse: null,
    smallStraight: null,
    largeStraight: null,
    chance: null,
    yatzy: null,
};

// Rolls dice and updates UI if rolls remain
function rollDice() {
    if (rollCount > 0) {
        let diceValues = [];
        for (let i = 0; i < 5; i++) {
            // Only roll the die if it is not locked
            if (!keptDice[i]) {
                const randomNumber = Math.floor(Math.random() * 6) + 1;
                diceValues.push(randomNumber);
                document.getElementById(`die${i + 1}`).setAttribute('data-value', randomNumber);
            } else {
                // If die is locked, keep its current value
                diceValues.push(parseInt(document.getElementById(`die${i + 1}`).getAttribute('data-value')));
            }
        }
        rollCount--;
        updateRollButton();
        updateDiceImages(diceValues);
        displayPossibleScores(diceValues);
    } else {
        alert("No rolls left! Select a category or reset for the next turn.");
    }
}

// Updates roll button text and styling based on rolls left
function updateRollButton() {
    const rollButton = document.getElementById('roll-button');
    rollButton.innerText = `Roll Dice (${rollCount} Rolls Left)`;
    rollButton.classList.toggle('disabled', rollCount === 0);
}

// Updates each die image based on current dice values
function updateDiceImages(diceValues) {
    for (let i = 0; i < 5; i++) {
        let dieElement = document.getElementById(`die${i + 1}`);
        dieElement.src = `images/dice${diceValues[i]}.png`;
        dieElement.setAttribute('data-value', diceValues[i]);
    }
}

// Calculates scores for all categories and updates UI
function displayPossibleScores(dice) {
    let counts = new Array(6).fill(0);
    dice.forEach(die => counts[die - 1]++);

    // Only update scores if they are not locked
    if (!("ones" in lockedCategories)) score.ones = counts[0] * 1;
    if (!("twos" in lockedCategories)) score.twos = counts[1] * 2;
    if (!("threes" in lockedCategories)) score.threes = counts[2] * 3;
    if (!("fours" in lockedCategories)) score.fours = counts[3] * 4;
    if (!("fives" in lockedCategories)) score.fives = counts[4] * 5;
    if (!("sixes" in lockedCategories)) score.sixes = counts[5] * 6;

    if (!("threeKind" in lockedCategories) && counts.some(count => count >= 3)) {
        score.threeKind = dice.reduce((a, b) => a + b, 0);
    } else if (!("threeKind" in lockedCategories)) {
        score.threeKind = 0;
    }

    if (!("fourKind" in lockedCategories) && counts.some(count => count >= 4)) {
        score.fourKind = dice.reduce((a, b) => a + b, 0);
    } else if (!("fourKind" in lockedCategories)) {
        score.fourKind = 0;
    }

    if (!("fullHouse" in lockedCategories) && counts.includes(3) && counts.includes(2)) {
        score.fullHouse = 25;
    } else if (!("fullHouse" in lockedCategories)) {
        score.fullHouse = 0;
    }

    if (!("chance" in lockedCategories)) {
        score.chance = dice.reduce((a, b) => a + b, 0);
    }

    updateScoreboard(); // Update scoreboard display
}

// Updates the score display on the UI
function updateScoreboard() {
    document.getElementById('score-ones').innerText = lockedCategories.ones ?? score.ones;
    document.getElementById('score-twos').innerText = lockedCategories.twos ?? score.twos;
    document.getElementById('score-threes').innerText = lockedCategories.threes ?? score.threes;
    document.getElementById('score-fours').innerText = lockedCategories.fours ?? score.fours;
    document.getElementById('score-fives').innerText = lockedCategories.fives ?? score.fives;
    document.getElementById('score-sixes').innerText = lockedCategories.sixes ?? score.sixes;
    document.getElementById('score-three-kind').innerText = lockedCategories.threeKind ?? score.threeKind;
    document.getElementById('score-four-kind').innerText = lockedCategories.fourKind ?? score.fourKind;
    document.getElementById('score-full-house').innerText = lockedCategories.fullHouse ?? score.fullHouse;
    document.getElementById('score-chance').innerText = lockedCategories.chance ?? score.chance;
}

// Locks in the selected category score and prevents re-selection
function selectScore(category) {
    if (selectedCategory === null && score[category] !== null && !(category in lockedCategories)) {
        selectedCategory = category;
        document.getElementById(`score-${category}`).classList.add('selected');
        lockCategoryScore(category);
        lockedCategories[category] = score[category]; // Lock the category score in lockedCategories
        selectedCategory = null; // Reset selectedCategory for the next turn
    }
}

// Adds score to total and locks category score
function lockCategoryScore(category) {
    if (score[category] !== null) {
        totalScore += score[category];
        document.getElementById('score-total').innerText = totalScore;
    }
}

// Toggles the kept status of a die
function toggleDieLock(dieIndex) {
    keptDice[dieIndex] = !keptDice[dieIndex];
    const dieElement = document.getElementById(`die${dieIndex + 1}`);
    dieElement.classList.toggle('locked'); // Add/remove 'locked' class for styling
}

// Prepares for the next turn by resetting roll count and kept dice
function startNewTurn() {
    rollCount = 3;
    keptDice = [false, false, false, false, false];
    selectedCategory = null;
    document.getElementById('roll-button').innerText = "Roll Dice (3 Rolls Left)";
    updateDiceImages([1, 2, 3, 4, 5]); // Reset dice images visually
    updateRollButton(); // Ensure button reflects the reset roll count
}

// Resets the entire game
function resetGame() {
    startNewTurn();
    resetScoreboard();
    lockedCategories = {}; // Clear all locked categories for a full reset
}

// Clears the scoreboard UI and resets total score
function resetScoreboard() {
    let scoreIds = [
        'score-ones', 'score-twos', 'score-threes', 'score-fours', 
        'score-fives', 'score-sixes', 'score-three-kind', 
        'score-four-kind', 'score-full-house', 'score-small-straight',
        'score-large-straight', 'score-chance', 'score-yatzy'
    ];

    scoreIds.forEach(id => {
        document.getElementById(id).innerText = '0';
        document.getElementById(id).classList.remove('selected');
    });
    
    totalScore = 0;
    document.getElementById('score-total').innerText = totalScore;
}

// Initializes event listeners for buttons and score selections
window.onload = function() {
    document.getElementById('roll-button').addEventListener('click', rollDice);
    document.getElementById('reset-button').addEventListener('click', resetGame);

    // Add click events to each die to lock/unlock them
    for (let i = 0; i < 5; i++) {
        document.getElementById(`die${i + 1}`).addEventListener('click', () => toggleDieLock(i));
    }

    document.getElementById('score-ones').addEventListener('click', () => selectScore('ones'));
    document.getElementById('score-twos').addEventListener('click', () => selectScore('twos'));
    document.getElementById('score-threes').addEventListener('click', () => selectScore('threes'));
    document.getElementById('score-fours').addEventListener('click', () => selectScore('fours'));
    document.getElementById('score-fives').addEventListener('click', () => selectScore('fives'));
    document.getElementById('score-sixes').addEventListener('click', () => selectScore('sixes'));
    document.getElementById('score-three-kind').addEventListener('click', () => selectScore('threeKind'));
    document.getElementById('score-four-kind').addEventListener('click', () => selectScore('fourKind'));
    document.getElementById('score-full-house').addEventListener('click', () => selectScore('fullHouse'));
    document.getElementById('score-chance').addEventListener('click', () => selectScore('chance'));
};
