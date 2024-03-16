let board = [
    ['','',''],
    ['','',''],
    ['','','']
];

let currentPlayer = 'X';
let gameOver = false;
let score = {
    'X': 0,
    'O': 0
};

function handleClick(event){
    if(!gameOver && event.target.classList.contains('cell')){
        let row = parseInt(event.target.getAttribute('data-row'));
        let col = parseInt(event.target.getAttribute('data-col'));
        if(board[row][col]=== ''){
            event.target.innerText = currentPlayer;
            board[row][col]= currentPlayer;
            if(checkWinner()){
                score[currentPlayer]++;
                if(score[currentPlayer]===3){
                    //alert('¡ '+currentPlayer+' !'+' ha ganado');
                    document.getElementById('mensaje').innerText = '!'+currentPlayer+' ha ganado el mejor de 5 juegos'                   
                    gameOver = true;
                    setTimeout(()=>{
                        window.location.reload();
                    },2500);
                } else{
                    resetBoard();
                }
                updateScore();//score
            } else if(checkDraw()){
                alert('Empate!');
                resetBoard();  
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if(currentPlayer === 'O'){
                    setTimeout(autoplay,500);
                }
            }
        }
    }
}

function checkWinner(){
    for(let i = 0; i < 3; i++){
        if(board[i][0] !== '' && board[i][0]=== board[i][1] && board[i][0]===board[i][2]){
            return true;
        }
        if(board[0][i] !== '' && board[0][i]=== board[1][i] && board[0][i]===board[2][i]){
            return true;
        }
    }
    if(board[0][0] !== '' && board[0][0]=== board[1][1] && board[0][0]===board[2][2]){
        return true;
    }
    if(board[0][2] !== '' && board[0][2]=== board[1][1] && board[0][2]===board[2][0]){
        return true;
    }
    return false;
}

function checkDraw(){
    for(let row of board){
        for(let cell of row){
            if(cell === ''){
                return false;
            }
        }
    }
    return true;
}

function autoplay(){
    let availableMoves = [];
    for (let i = 0; i < 3;i++) {
        for(let j = 0; j< 3; j++){
            if(board[i][j]=== ''){
                availableMoves.push([i,j]);
            }
        }
    }
    if(availableMoves.length > 0){
        let randomMove = availableMoves[Math.floor(Math.random()*availableMoves.length)];
        let row = randomMove[0];
        let col = randomMove[1];
        let cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
        cell.click();
    }    
}

function resetBoard(){
    board = [
        ['','',''],
        ['','',''],
        ['','','']
    ];
    currentPlayer = 'X';
    updateDisplay();
}
function updateScore(){
    document.getElementById('score').innerText = 'Puntuacion: X - '+score['X'] + ' | O - '+score['O'];
}
function updateDisplay(){
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = '');
    document.querySelector('#mensaje').innerText = '';
    updateScore();
}
