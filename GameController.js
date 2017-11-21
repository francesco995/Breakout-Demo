class GameController{

    constructor(){
        this.playerName = sessionStorage.getItem("player_name");
        this.score = 0;
        this.lblPlayerName = document.getElementById("lblPlayerName");
        this.lblPlayerScore = document.getElementById("lblPlayerScore");

        this.updatePlayerName();
        this.updatePlayerScore();

        this.ball = new Ball(112, 450, 12, this.makeRandomColor());
        this.player = new Player(50, 700, 150, this.makeRandomColor());

        this.initWall();

        this.startLoop();


    }





    movePlayer(event){
        this.player.move(event.x);
    }

    stopLoop(){
        clearInterval(this.loopId);
        this.loopId = undefined;
    }

    startLoop(){
        this.loopId = setInterval(() => this.update(), 32)
    }


    update(){
        this.ball.update();

        for(var i = 0; i < this.bricks.length; i++){
            var hit = false;

            if (this.ball.y < this.bricks[i].y + this.bricks[i].height
                && this.ball.x >= this.bricks[i].x
            ){
                hit = true;
            }

        }


        if(
            this.ball.x < 0 ||
            this.ball.x + this.ball.radius*2 >= document.body.clientWidth){


            this.ball.x -= this.ball.vX;
            this.ball.y -= this.ball.vY;

            this.ball.vX *= -1;
        }

        if(
            this.ball.y < 0 ||
            this.ball.y + this.ball.radius*2 >= this.player.y + 30){

            if(
                this.ball.x + this.ball.radius*2 < this.player.x ||
                this.ball.x >= this.player.x + this.player.length){
                this.stopLoop();
            } else{
                this.ball.x -= this.ball.vX;
                this.ball.y-= this.ball.vY;

                this.ball.vY *= -1;
            }


        }

    }


    makeRandomColor() {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        return "rgb(" + randomR + ", " + randomG + ", " + randomB + ")"
    }

    updatePlayerName(){
        this.lblPlayerName.innerHTML = "Name: " + this.playerName;
    }

    updatePlayerScore(){
        this.lblPlayerScore.innerHTML = "Score: " + this.score;
    }


    initWall() {
        const BRICK_WIDTH = 100;
        const BRICK_HEIGHT = 25;
        let BRICK_W = 8;
        let BRICK_H = 10;

        this.bricks = [];


        for(let i = 0; i<BRICK_W; i++){
            for(let j = 0; j<BRICK_H; j++){
                this.bricks.push(
                    new Brick(
                        BRICK_WIDTH * i,
                        BRICK_HEIGHT * j,
                        BRICK_WIDTH,
                        BRICK_HEIGHT,
                        this.makeRandomColor())
                );
            }
            BRICK_H--;
        }
    }
}

class Player{
    constructor(x, y, length, color){
        this.x = x;
        this.y = y;
        this.length = length;
        this.color = color;

        this.domElement = document.createElement("div");
        this.domElement.style.backgroundColor = this.color;
        this.domElement.style.position = "relative";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this. y + "px";
        this.domElement.style.width = this.length + "px";
        this.domElement.style.height = "12px";

        this.container = document.getElementById("gameScreen");
        this.container.appendChild(this.domElement);

    }

    move(newX){
        this.x = newX;

        this.domElement.style.left = this.x - (this.length/2) + "px";
    }

}

class Ball {

    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;

        this.vX = -4;
        this.vY = -4;

        this.radius = radius;
        this.color = color;

        this.domElement = document.createElement("div");
        this.domElement.style.backgroundColor = this.color;
        this.domElement.style.position = "relative";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this. y + "px";
        this.domElement.style.width = 2*this.radius + "px";
        this.domElement.style.height = 2*this.radius + "px";
        this.domElement.style.borderRadius = this.radius + "px";

        this.container = document.getElementById("gameScreen");
        this.container.appendChild(this.domElement);

    }


    update(){
        this.x += this.vX;
        this.y += this.vY;

        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this.y + "px";
    }

}

class Brick {

    constructor(x, y, width, height, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.destroyed = false;

        this.domElement = document.createElement("div");
        this.domElement.style.backgroundColor = this.color;
        this.domElement.style.position = "absolute";
        this.domElement.style.left = this.x + "px";
        this.domElement.style.top = this. y + "px";
        this.domElement.style.width = this.width + "px";
        this.domElement.style.height = this.height + "px";

        this.container = document.getElementById("gameScreen");
        this.container.appendChild(this.domElement);

    }


    destroy(){

    }

}

var ctrl = new GameController();
