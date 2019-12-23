console.log("workin!");

function Furry () {
    this.x = 0; 
    this.y = 0; 
    this.direction = "right";
}

function Coin () {
    this.x = Math.floor(Math.random() * 10);
    this.y  = Math.floor(Math.random() * 10);
}

function Game () {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
      }
     
      this.hideVisibleFurry = function () {
        var element = document.querySelector('.furry');
        element.classList.remove('furry');
    }
    
    this.showFurry = function () {
        
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
        
    }
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }
   
    this.moveFurry = function () {

      
        
        if (this.furry.direction === 'right') {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === 'left') {
            this.furry.x = this.furry.x - 1; 
        } else if (this.furry.direction  === 'down') {
            this.furry.y = this.furry.y - 1; 
        } else if (this.furry.direction === 'up') {
            this.furry.y = this.furry.y + 1;
        }
     
        this.hideVisibleFurry();
        this.showFurry();
        this.checkCoinCollision();
        this.gameOver();
        
        
}


    
    this.startGame = function () {
        var self=this;
        this.idSetInterval = setInterval (function (){ 
            self.moveFurry();
        }, 1000)
        
    }

    this.turnFurry = function (event) {
        switch (event.keyCode) {
            case 37: 
                this.furry.direction = "left";
                break;
                    
            case 38: 
                    this.furry.direction = "down";
                    break;
            case 39: 
                    this.furry.direction = "right";
                        break;
            case 40: 
                    this.furry.direction = "up";  
                        break;
                
    }
        this.moveFurry();
}

var score = document.querySelector('#score div');
var i = 0; 

this.checkCoinCollision = function () {
        if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {
            // console.log('yes');
            elementcoin = document.querySelector('div.coin');
            elementcoin.classList.remove('coin');
            i++;
            score.innerHTML= "SCORE " + "<br />" + i;
            var newCointoShow = new Coin;
            this.coin = newCointoShow;
            this.showCoin();
        }
    }

this.gameOver = function () {
    if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
       clearInterval(this.idSetInterval);
        this.hideVisibleFurry();
        var boardwindow = document.querySelector ('#board');
        boardwindow.classList.add('invisible');
        score.style.background = "red";
        score.style.color = "white";
        score.style.width = "400px";
        score.style.height = "200px";
        score.style.fontSize = "50px";
        score.innerHTML = "GAME OVER!" + "<br />" + "SCORE: " + i;

        } 
    }
}


var game = new Game;
game.showFurry();
game.showCoin();
game.startGame();
document.addEventListener ('keydown', function (event) {
    game.turnFurry(event);
});