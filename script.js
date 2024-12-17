let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
const statusDiv = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-btn');

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function isPlayerPresent(positions, player) {
    return positions.every(index => board[index] === player);
}

function checkForWinner() {
    if (isPlayerPresent([0, 1, 2], "X") || isPlayerPresent([3, 4, 5], "X") || isPlayerPresent([6, 7, 8], "X") || 
        isPlayerPresent([0, 3, 6], "X") || isPlayerPresent([1, 4, 7], "X") || isPlayerPresent([2, 5, 8], "X") || 
        isPlayerPresent([0, 4, 8], "X") || isPlayerPresent([2, 4, 6], "X")) {
        alert("Player X Wins");
        gameActive = false;
        return true;
    }

    if (isPlayerPresent([0, 1, 2], "O") || isPlayerPresent([3, 4, 5], "O") || isPlayerPresent([6, 7, 8], "O") || 
        isPlayerPresent([0, 3, 6], "O") || isPlayerPresent([1, 4, 7], "O") || isPlayerPresent([2, 5, 8], "O") || 
        isPlayerPresent([0, 4, 8], "O") || isPlayerPresent([2, 4, 6], "O")) {
        alert("Player O Wins");
        gameActive = false;
        return true;
    }

    if (!board.includes('')) {
        statusDiv.textContent = "It's a Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

function updateStatus() {
    if (gameActive) {
        statusDiv.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        statusDiv.textContent = `Game Over! Player ${currentPlayer} wins!`;
    }
}

function handleCellClick(index) {
    if (board[index] || !gameActive) return;
    board[index] = currentPlayer;

    const img = document.createElement('img');
    img.src = currentPlayer === 'X' ? 'letter-x.png' : 'letter-o.png';
    img.alt = currentPlayer;
    img.style.width = '100px';
    img.style.height = '100px';
    cells[index].appendChild(img);

    if (!checkForWinner()) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateStatus();
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    cells.forEach(cell => {
        cell.innerHTML = '';
    });
    updateStatus();
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetButton.addEventListener('click', resetGame);

updateStatus();
