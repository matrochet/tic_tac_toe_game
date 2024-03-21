// Variables globales -- commentaire permanent
// let currentPlayer = 'X';
// let gameBoard = ['', '', '', '', '', '', '', '', ''];
// let gameActive = true;
// 
// Fonction pour vérifier le gagnant -- commentaire permanent
// const checkWinner = () => {
//   const winningConditions = [
    // [0, 1, 2],
    // [3, 4, 5],
    // [6, 7, 8],
    // [0, 3, 6],
    // [1, 4, 7],
    // [2, 5, 8],
    // [0, 4, 8],
    // [2, 4, 6]
//   ];
// 
//   for (let i = 0; i < winningConditions.length; i++) {
    // const [a, b, c] = winningConditions[i];
    // if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
    //   return gameBoard[a];
    // }
//   }
// 
//   return null;
// };
// 
// Fonction pour vérifier si la grille est remplie -- commentaire permanent
// const checkTie = () => {
//   return gameBoard.every(cell => cell !== '');
// };
// 
// Fonction pour afficher le message de fin de partie -- commentaire permanent
// const endGame = (winner) => {
//   gameActive = false;
//   if (winner) {
    // alert(`Le joueur ${winner} a gagné!`);
//   } else {
    // alert("Match nul!");
//   }
// };
// 
// Fonction pour gérer le clic sur une case -- commentaire permanent 
// const handleClick = (cell, index) => {
//   if (gameBoard[index] === '' && gameActive) {
    // gameBoard[index] = currentPlayer;
    // cell.textContent = currentPlayer;
// 
    // const winner = checkWinner();
    // if (winner) {
    //   endGame(winner);
    // } else if (checkTie()) {
    //   endGame(null);
    // } else {
    //   currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    // }
//   }
// };
// 
// Fonction pour initialiser le jeu -- commentaire permanent
// const init = () => {
//   const cells = document.querySelectorAll('.cell');
//   cells.forEach((cell, index) => {
    // cell.addEventListener('click', () => handleClick(cell, index));
//   });
// };
// 
// document.addEventListener('DOMContentLoaded', init);
// 

document.addEventListener("DOMContentLoaded", function() {
    const grid = document.getElementById("grid");
    const cells = document.querySelectorAll(".case");
    const joueurSpan = document.getElementById("joueur");
    const score1Span = document.getElementById("score1");
    const score2Span = document.getElementById("score2");
    const scoreNulSpan = document.getElementById("scoreNul");
    const restartButton = document.createElement('button');

    let currentPlayer = 1;
    let score1 = 0;
    let score2 = 0;
    let scoreNul = 0;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameEnded = false;

    // Function to check for a win
    function checkWin() {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6] // Diagonal
        ];

        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        // Check for draw
        if (!gameBoard.includes('')) {
            return 'draw';
        }

        return null;
    }

    // Function to handle cell click
    function handleCellClick(index) {
        if (gameEnded || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer === 1 ? 'X' : 'O';
        cells[index].textContent = gameBoard[index];

        const winner = checkWin();
        if (winner) {
            gameEnded = true;
            if (winner === 'draw') {
                scoreNul++;
                scoreNulSpan.textContent = scoreNul;
            } else if (winner === 'X') {
                score1++;
                score1Span.textContent = score1;
                animateWin(cells, currentPlayer);
            } else {
                score2++;
                score2Span.textContent = score2;
                animateWin(cells, currentPlayer);
            }
            restartButton.style.display = 'block';
            return;
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;
        joueurSpan.textContent = currentPlayer;
    }

    // Function to restart the game
    function restartGame() {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
        });
        gameEnded = false;
        restartButton.style.display = 'none';
    }

    // Function to animate win
    function animateWin(cells, currentPlayer) {
        const winningPlayer = currentPlayer === 1 ? 'Joueur 1' : 'Joueur 2';
        cells.forEach(cell => {
            cell.style.backgroundColor = 'lightgray';
            setTimeout(() => {
                cell.style.backgroundColor = '';
            }, 1000);
        });
        alert(`${winningPlayer} a gagné !`);
    }

    // Add click event listeners to cells
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            handleCellClick(index);
        });
    });

    // Add restart button
    restartButton.textContent = 'Restart Game';
    restartButton.addEventListener('click', restartGame);
    document.body.appendChild(restartButton);
});
