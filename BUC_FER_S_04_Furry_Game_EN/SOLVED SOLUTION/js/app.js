const Coin = require('./coin');
const Furry = require('./furry');

const Game = function (board, furry, coin) {
    this.board = board;
    this.furry = furry;
    this.coin = coin;
    this.score = 0;
    this.pace = 250;
    const self = this;

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        self.hideVisibleFurry();
        if(!self.gameOver()) {
            this.board[this.index(self.furry.x, self.furry.y)].classList.add('furry');
        }
    };

    this.showCoin = function () {
        this.board[this.index(self.coin.x, self.coin.y)].classList.add('coin');
    };

    this.startGame = function () {
        console.log(self.pace);
        if(this.idSetInterval){
            clearInterval(this.idSetInterval);
        }
        this.idSetInterval = setInterval(function (){
                self.moveFurry();
                self.showFurry();
        }, self.pace);
    };

    this.moveFurry = function () {
        switch(this.furry.direction){
            case "right":
                this.furry.x += 1;
                break;
            case "left":
                this.furry.x -= 1;
                break;
            case "up":
                this.furry.y -= 1;
                break;
            case "down":
                this.furry.y += 1;
                break;
        }
        self.checkCoinCollision();
    };

    this.hideVisibleFurry = function () {
        const previousFurry = document.querySelector('.furry');
        if(previousFurry) {
            previousFurry.classList.remove("furry");
        }
    };

    this.changeDirectionFurry = function (event) {
        switch(event.which){
            case 37:
                this.furry.direction = "left";
                break;
            case 38:
                this.furry.direction = "up";
                break;
            case 39:
                this.furry.direction = "right";
                break;
            case 40:
                this.furry.direction = "down";
                break;
        }
    };

    this.checkCoinCollision = function () {
        if(self.furry.x === self.coin.x && self.furry.y === self.coin.y){
            document.querySelector('.coin').classList.remove('coin');
            self.score += 1;
            document.querySelector('#score strong').innerText = self.score;
            if(self.pace > 50 && self.score % 5 === 0){
                self.startGame(self.pace -= 50);
            }
            self.coin = new Coin();
            self.showCoin();
        }
    };

    this.gameOver = function () {
        if(self.furry.x < 0 || self.furry.x > 9 || self.furry.y < 0 || self.furry.y > 9){
            self.hideVisibleFurry();
            clearTimeout(self.idSetInterval);
            alert("Your score is: " + self.score);
            return true;
        }
        return false;
    }
};

document.addEventListener('DOMContentLoaded', function(){
    const board = this.querySelectorAll('#board div');
    const _Game = new Game(board, new Furry(0, 0, 'right'), new Coin());
    _Game.showFurry();
    _Game.showCoin();
    _Game.startGame();
    this.addEventListener("keydown", (event) => {
       _Game.changeDirectionFurry(event);
    });
});