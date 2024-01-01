const gameBoard = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.btn');
const alertBox = document.querySelector('.alertBox')

// making variables
let currentPlayer = '1';
let nextPlayer = '0';
let turnPlayer = currentPlayer;

player1.textContent = ` Player 1: ${currentPlayer}`;
player2.textContent = ` Player 2: ${nextPlayer}`

// start game function

function gameStart() {
    gameBoard.forEach(cell => {
        cell.addEventListener('click' , clickCell)
      
    })
}

function clickCell(e) {
    if (e.target.textContent==='') {
        e.target.textContent = turnPlayer;  
        if (checkWin()) {
            showAlert(turnPlayer + " is win the game")
            diasableCell();
        }

        else if (checkTie()) {
            showAlert(" Its is a Tie")
            diasableCell()
        }
       else{
        changePlayTurn();
       }
    
    }
}

function changePlayTurn() {
    if (turnPlayer === currentPlayer) {
        turnPlayer = nextPlayer;
    } else {
        turnPlayer = currentPlayer;
    }
}

// function to check win

function checkWin() {
    const winingConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6], 
    ]

    for (let i = 0; i < winingConditions.length; i++) {
        const [pos1 , pos2 ,pos3] =winingConditions[i];
        if (gameBoard[pos1].textContent !== '' &&
            gameBoard[pos1].textContent === gameBoard[pos2].textContent &&
            gameBoard[pos2].textContent === gameBoard[pos3].textContent       
        ) {
            return true;
        }
    };  
    return false;
}


    // function check tie

    function checkTie() {
        let countCell = 0;
        gameBoard.forEach(cell => {
            if (cell.textContent === '') {
                countCell++
            }
        })
        
        return countCell === 0 && !checkWin();  
    }

    //  diasable cell

    function diasableCell() {
        gameBoard.forEach(cell => {
            cell.removeEventListener('click' ,clickCell);
            cell.classList.add('diasable')
        })
    }

    // restart button 

    function restartGame() {
        gameBoard.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('diasable')
        });
        gameStart();
    }

    restartBtn.addEventListener('click' ,restartGame)

    //  show alert

    function showAlert(msg) {
        alertBox.style.display = 'block';
        alertBox.textContent = msg;
        setTimeout(() =>{
            alertBox.style.display= 'none'
        },3000)
    }

gameStart()


