const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (e.g., game.html, styles.css, main.js)
app.use(express.static(path.join(__dirname, '..')));

// Serve the main game HTML file explicitly
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../game.html')); // Ensure absolute path to game.html
});

// Example game state on the server
let gameState = { lockedCategories: {}, scores: {}, totalScore: 0 };

// POST endpoint to roll dice
app.post('/roll-dice', (req, res) => {
    // Generate random dice values (1 to 6 for 5 dice)
    const diceValues = Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
    res.json({ diceValues });
});

// POST endpoint to calculate score
app.post('/calculate-score', (req, res) => {
    const { category, diceValues } = req.body;

    // Frequency count of dice values (1-6)
    const counts = Array(6).fill(0);
    diceValues.forEach(die => counts[die - 1]++);

    let score = 0;

    // Scoring logic for each category
    switch (category) {
        case 'ones':
            score = counts[0] * 1;
            break;
        case 'twos':
            score = counts[1] * 2;
            break;
        case 'threes':
            score = counts[2] * 3;
            break;
        case 'fours':
            score = counts[3] * 4;
            break;
        case 'fives':
            score = counts[4] * 5;
            break;
        case 'sixes':
            score = counts[5] * 6;
            break;
        case 'threeKind':
            score = counts.some(count => count >= 3) ? diceValues.reduce((a, b) => a + b) : 0;
            break;
        case 'fourKind':
            score = counts.some(count => count >= 4) ? diceValues.reduce((a, b) => a + b) : 0;
            break;
        case 'fullHouse':
            score = counts.includes(3) && counts.includes(2) ? 25 : 0;
            break;
        case 'smallStraight':
            score = counts.slice(0, 5).every(count => count >= 1) ? 30 : 0;
            break;
        case 'largeStraight':
            score = counts.slice(1).every(count => count >= 1) ? 40 : 0;
            break;
        case 'chance':
            score = diceValues.reduce((a, b) => a + b, 0);
            break;
        case 'yatzy':
            score = counts.some(count => count === 5) ? 50 : 0;
            break;
        default:
            score = 0;
    }

    res.json({ score });
});

// PUT endpoint to reset the game state
app.put('/game-state', (req, res) => {
    const { reset } = req.body;

    if (reset) {
        gameState = { lockedCategories: {}, scores: {}, totalScore: 0 };
        res.json({ message: 'Game state reset', gameState });
        return;
    }

    res.status(400).json({ message: 'Invalid request' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
