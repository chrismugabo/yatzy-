# Yatzy Game Design Documentation

## Overview
This project is a part of CST3106 - LAB 05, where I designed and documented a single-player Yatzy game using a structured design system approach. The Yatzy game is a popular dice game where players try to score points by rolling five dice to achieve specific combinations.

## Lab Steps

### 1. Game Documentation in Markdown
This section provides an overview of the Yatzy game and its rules. Players roll five dice and try to score by making different combinations. The game ends when all score categories are filled, and the player with the highest total score wins.

### Game Rules
- **Roll Five Dice**: The player rolls five dice per turn.
- **Re-rolls**: The player may choose to hold certain dice and re-roll the others up to two more times per turn.
- **Scoring**: Players must select a category to score points for each turn. Available categories include:
  - **Ones, Twos, Threes, etc.**: Score based on the number of matching dice.
  - **Three of a Kind**: Total of all dice if at least three are the same.
  - **Four of a Kind**: Total of all dice if at least four are the same.
  - **Full House**: Three of one number and two of another, scores 25 points.
  - **Small Straight**: Four consecutive numbers, scores 30 points.
  - **Large Straight**: Five consecutive numbers, scores 40 points.
  - **Yatzy**: Five of a kind, scores 50 points.
  - **Chance**: Total of all dice.
  
The game ends when all categories are filled, and the player's total score is displayed.

### 2. Design System Documentation

#### Color Scheme
- **Primary Color**: #3498db (Light Blue)
- **Secondary Color**: #e74c3c (Bright Red)
- **Background Color**: #f1f1f1 (Light Gray)
- **Text Color**: #2c3e50 (Dark Gray)

These colors are chosen to provide a visually appealing contrast that ensures readability and a pleasant user experience.

#### Fonts
- **Headings**: 'Montserrat', sans-serif
- **Subheadings**: 'Lato', sans-serif
- **Body Text**: 'Open Sans', sans-serif

The fonts are chosen for clarity and modern appearance, with a focus on readability and a consistent style throughout the game interface.

### 3. Dice Design

#### Dice Look and Feel
- **Size**: 100x100 pixels for each die.
- **Dice Color**: White (#ffffff).
- **Pip Color**: Black (#000000).
- **Pips (Dots)**: Circular dots evenly spaced on each die face.

This simple and clean design for the dice ensures they are easy to read and distinguish while playing the game.

### 4. Game Mock-ups

#### HTML/CSS Mock-ups
The game will feature a clean and responsive user interface. The primary components include:
- **Dice Area**: Displays the five dice and allows the player to hold and roll them.
- **Scorecard**: Displays the current score and allows the player to select a category to score after each turn.
- **Roll Button**: A button that allows the player to roll or reroll dice.
  
Here is a basic HTML structure for the mock-up:

```html
<!-- Dice Area -->
<div class="dice-area">
  <div class="dice">1</div>
  <div class="dice">2</div>
  <div class="dice">3</div>
  <div class="dice">4</div>
  <div class="dice">5</div>
</div>

<!-- Scorecard -->
<div class="scorecard">
  <div class="score-category">Ones: <span class="score">0</span></div>
  <div class="score-category">Twos: <span class="score">0</span></div>
  <!-- Other categories... -->
</div>

<!-- Roll Button -->
<button class="roll-btn">Roll Dice</button>
