// script.js
const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Tracks the board state
let gameActive = true;

// Function to create the Tic-Tac-Toe grid
function createBoard() {
    board.innerHTML = ''; // Clear the board before re-rendering

    gameBoard.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.setAttribute('data-index', index);
        cellDiv.innerText = cell;
        cellDiv.addEventListener('click', handleCellClick);
        board.appendChild(cellDiv);
    });
}

// Function to handle a cell click
function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');
    if (gameBoard[cellIndex] || !gameActive) return; // Ignore if already filled or game is over

    gameBoard[cellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;

    // Check for a winner
    if (checkWinner()) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        gameActive = false;
        return;
    }

    // Check for a draw
    if (gameBoard.every(cell => cell)) {
        setTimeout(() => alert('It\'s a draw!'), 100);
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to check if there's a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Diagonal
        [2, 4, 6]  // Diagonal
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }

    return false;
}

// Function to reset the game
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    createBoard();
}

// Initialize the game
createBoard();

// Add event listener for the reset button
resetButton.addEventListener('click', resetGame);
