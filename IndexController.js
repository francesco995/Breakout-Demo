class IndexController {

    constructor(){

        this.playerName = undefined;

        this.txtName = document.getElementById('txtPlayerName');

        this.btnStart = document.getElementById('btnStart');
        this.btnStart.setAttribute('disabled', 'disabled');
    }

    trackPlayerChange(){
        this.playerName = this.txtName.value;

        if(this.playerName.length > 0){
            this.btnStart.removeAttribute('disabled');
        }else{
            this.btnStart.setAttribute('disabled', 'disabled');
        }
    }

    startGame(){
        sessionStorage.setItem("player_name", this.playerName);
        window.location.href = './game.html';
    }

}


var ctrl = new IndexController();
