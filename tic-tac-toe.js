/*
/   Coding Steps:
------------------------
/   Using any of the tools you've worked with so far,
/    create a game of Tic-Tac-Toe.
/
/   Create a Tic-Tac-Toe game grid using your HTML element of choice.
/
/   When a cell in the grid is clicked, an X or O should appear in
/    that spot depending on whose turn it is.
/    A heading should say whether it is X's or O's turn and
/    change with each move made.
/
/   A button should be available to clear the grid and restart the game.
/
/   When a player has won, or the board is full and the game results
/    in a draw, a Bootstrap alert or similar Bootstrap component should
/    appear across the screen announcing the winner.
/
*/

const X_CLASS = 'x'
const O_CLASS = 'o'
// Player turns

const gameStatusText = document.getElementById('gameStatus')
const gameBoard = document.getElementById('gameBoard')
const gameOverMessage = document.getElementById('gameOver')
const announceWinner = document.getElementById('winner')
const resetBtn = document.getElementById('reset')

let gameOver = false
let O_TURN

newGame()
resetBtn.addEventListener('click', newGame)

function newGame() {
    O_TURN = false
    gameOver = false
    gameStatusText.innerHTML = 'Start!'
    gameBoard.innerHTML = ' '
    boardHover()
    buildBoard()

    gameOverMessage.classList.remove('show')

}
function buildBoard() {
    board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ]
    for (r = 0; r < 3; r++) {
        for (c = 0; c < 3; c++) {
            const tile = document.createElement('div')
            tile.id = r.toString() + '-' + c.toString()
            tile.classList.add('ttt__tile')
            gameBoard.append(tile)
            tile.addEventListener('click', setTile, { once: true })

        }

    }
}

function setTile() {

    if (gameOver) {
        return
    }

    let coords = this.id.split('-')
    let r = parseInt(coords[0])
    let c = parseInt(coords[1])

    const currentTurn = O_TURN ? O_CLASS : X_CLASS

    board[r][c] = currentTurn
    this.classList.add(currentTurn)

    isGameOver()
    gameStatus()
}

function gameStatus() {
    if (!gameOver) {
        gameStatusText.innerHTML = `${O_TURN ? O_CLASS : X_CLASS}'s Turn `

    } else {
        gameStatusText.innerHTML = 'Game Over!'
    }
}
function swapTurn() {
    O_TURN = !O_TURN
}
function winningCombos() {
    // Checks Horizontal 
    for (let r = 0; r < 3; r++) {
        if (board[r][0] == board[r][1] && board[r][1] == board[r][2] && board[r][0] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(r.toString() + '-' + i.toString())
                tile.classList.add('winner')
            }
            gameOverMessage.classList.add('show')
            return true
        }
    }
    // Checks Vertical
    for (let c = 0; c < 3; c++) {
        if (board[0][c] == board[1][c] && board[1][c] == board[2][c] && board[0][c] != ' ') {
            for (let i = 0; i < 3; i++) {
                let tile = document.getElementById(i.toString() + '-' + c.toString())
                tile.classList.add('winner')
            }
            gameOverMessage.classList.add('show')
            return true
        }
    }
    // Checks L2R Diagonal
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ' ') {
        for (let i = 0; i < 3; i++) {
            let tile = document.getElementById(i.toString() + '-' + i.toString())
            tile.classList.add('winner')
        }
        gameOverMessage.classList.add('show')
        return true
    }
    // Checks R2L Diagonal
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != ' ') {
        let tile = document.getElementById('0-2')
        tile.classList.add('winner')
        tile = document.getElementById('1-1')
        tile.classList.add('winner')
        tile = document.getElementById('2-0')
        tile.classList.add('winner')
        gameOverMessage.classList.add('show')
        return true
    }

}

function checkTie() {
    let count = 0;
    for (let r = 0; r < 3; r++) {
        for (c = 0; c < 3; c++) {
            if (board[r][c] != ' ') {
                count++;
            }
        }
    }

    if (count == 9) {
        for (let r = 0; r < 3; r++) {
            for (c = 0; c < 3; c++) {
                gameOverMessage.classList.add('show')
                return true
            }
        }
    }
}

function isGameOver() {
    if (winningCombos()) {
        gameOver = true
        announceWinner.innerHTML = `${O_TURN ? O_CLASS : X_CLASS} WINS! `
    } else if (checkTie()) {
        gameOver = true
        announceWinner.innerHTML = 'TIE!'
    } else {
        swapTurn()
        boardHover()
    }

}
function boardHover() {
    gameBoard.classList.remove(X_CLASS)
    gameBoard.classList.remove(O_CLASS)
    if (O_TURN) {
        gameBoard.classList.add(O_CLASS)
    } else {
        gameBoard.classList.add(X_CLASS)
    }

}