# Yatzy Game Design Documentation

## Overview
Yatzy is a classic single-player dice game where players roll five dice and aim to score points by achieving specific combinations. The game concludes when all score categories are filled, and the final score is displayed.

---

## Game Rules
- **Roll Dice**: Players roll five dice at the start of each turn.
- **Re-rolls**: Players can re-roll some or all dice up to two additional times per turn.
- **Scoring**: At the end of each turn, players must choose one of the following scoring categories:
  - **Ones, Twos, Threes, etc.**: Sum of dice matching the selected number.
  - **Three of a Kind**: Sum of all dice if at least three have the same value.
  - **Four of a Kind**: Sum of all dice if at least four have the same value.
  - **Full House**: Three dice of one number and two dice of another number (25 points).
  - **Small Straight**: Sequence of four consecutive dice values (30 points).
  - **Large Straight**: Sequence of five consecutive dice values (40 points).
  - **Yatzy**: All five dice showing the same value (50 points).
  - **Chance**: Sum of all dice, with no restrictions.

The game ends when all categories are scored, and the final score is displayed.

---

## Design System

### Color Scheme
The color palette is chosen to create a modern and visually appealing interface:

- **Primary Color**: `#3498db` (Light Blue)
- **Secondary Color**: `#e74c3c` (Bright Red)
- **Background Color**: `#f1f1f1` (Light Gray)
- **Text Color**: `#2c3e50` (Dark Gray)

These colors provide strong contrast and ensure readability while maintaining a clean aesthetic.

### Fonts
A modern and readable typography system is used throughout the game interface:

- **Headings**: `'Montserrat', sans-serif`
- **Subheadings**: `'Lato', sans-serif`
- **Body Text**: `'Open Sans', sans-serif`

This font selection balances style and readability, enhancing the user experience.

---

## Dice Design

- **Size**: Each die measures 100x100 pixels for clear visibility.
- **Dice Color**: White (`#ffffff`) for a clean and classic appearance.
- **Pip Color**: Black (`#000000`) for high contrast.
- **Pips (Dots)**: Circular and evenly spaced for a polished look.

---

## Game Mock-ups

### Interface Components
The user interface is designed for simplicity and responsiveness:

1. **Dice Area**:
   - Displays five dice.
   - Allows players to hold or re-roll selected dice.

2. **Scorecard**:
   - Displays available categories and current scores.
   - Enables players to select a scoring category at the end of each turn.

3. **Roll Button**:
   - A large, centrally located button for rolling or re-rolling dice.

---

## Additional Features

### Layout and Flow
- The game interface follows a structured layout:
  - Dice area at the top.
  - Scorecard in the middle.
  - Roll button at the bottom.

### User Interactions
- Clicking on a die marks it as held for the next roll.
- Animations are used to highlight dice rolls and score updates.

### Design Choices
- A clean and intuitive layout is chosen to reduce player confusion.
- The use of bright colors and modern fonts ensures a vibrant and engaging user experience.

---

## Future Enhancements
- Implementing animations for dice rolls.
- Adding a leaderboard to track high scores.
- Introducing sound effects for a more immersive experience.

---
