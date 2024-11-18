const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (CSS, JS, images) from the parent directory
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
    res.json({ diceValues }); // Return the dice values as a JSON response
});

// GET endpoint to fetch the current game state
app.get('/game-state', (req, res) => {
    res.json(gameState);
});

// PUT endpoint to update the game state (e.g., lock a score or reset the game)
app.put('/game-state', (req, res) => {
    const { category, score, reset } = req.body;

    if (reset) {
        // Reset all categories and scores
        gameState = { lockedCategories: {}, scores: {}, totalScore: 0 };
        res.json({ message: 'Game state reset', gameState });
        return;
    }

    if (category && score !== undefined) {
        // Lock a category and save the score
        gameState.lockedCategories[category] = score;
        gameState.scores[category] = score;
        gameState.totalScore += score;
    }

    res.json({ message: 'Game state updated', gameState });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
