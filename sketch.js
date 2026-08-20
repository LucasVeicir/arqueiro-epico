const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine;
let world;
let canvas;
let bgImg;
let playerBase;
let player;
let playerArcher;
let board1,board2;
let playerArrow=[];
let numberOfArows=10;
let score=0;
let gameState="play";

function preload(){
    bgImg = loadImage('assets/background.png')
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;
    playerBase = new PlayerBase(300,500,180,150);
    player = new Player(285,playerBase.body.position.y-153,50,180);
    playerArcher = new PlayerArcher(340,playerBase.body.position.y-180,120,120);
    board1 = new Board(width-300,330,50,200);
    board2 = new Board(width-550,height-300,50,200)
}

function draw(){
    background(bgImg);
    Engine.update(engine);

    playerBase.display();
    player.display();
    playerArcher.display();
    board1.display();
    board2.display();

    for(let i = 0; i<playerArrow.length; i++){
        if(playerArrow[i] !== undefined){
            playerArrow[i].display();
            let arrowPos = playerArrow[i].body.position;
            let board1Pos = board1.body.position;
            let board2Pos = board2.body.position;
            let d1 = dist(arrowPos.x, arrowPos.y,board1Pos.x,board1Pos.y);
            let d2 = dist(arrowPos.x,arrowPos.y,board2Pos.x,board2Pos.y);
            if(d1<120||d2<120){
                score+=5;
                playerArrow[i].remove(i);
            }
            let posX = arrowPos.x;
            let posY = arrowPos.y;
            if(posX>width||posY>height){
                if(!playerArrow[i].isRemoved){
                    playerArrow[i].remove(i);
                }
                else{
                    playerArrow[i].trajectory = [];
                }
            }

        }
    }

    fill("#FFF");
    textAlign("center");
    textSize(40);
    text("arqueiro epico",width/2,100);
    textSize(30);
    text("flechas restantes: "+numberOfArows,200,100);
    text("pontuação: "+score,width-200,100);
    if(numberOfArows == 0 && gameState === "play"){
        gameState = "end";
        gameOver();
    }
    if(gameState ==="end"){
        return;
    }
}

function keyPressed(){
        if(keyCode===32){
            if(numberOfArows>0){
                let posX = playerArcher.body.position.x;
                let posY = playerArcher.body.position.y;
                let angle = playerArcher.body.angle;
                let arrow = new PlayerArrow(posX,posY,100,10,angle);
                arrow.trajectory = [];
                Matter.Body.setAngle(arrow.body,angle);
                playerArrow.push(arrow);
                numberOfArows -= 1;
            }
        }
    }

function keyReleased(){
    if(keyCode===32){
        if(playerArrow.length){
            let angle = playerArcher.body.angle;
            playerArrow[playerArrow.length-1].shoot(angle);
        }
    }
}

function gameOver(){
    swal(
        {
            title: "fim de jogo",
            text : "obrigado por jogar. Sua pontuação: "+ score,
            icon: "info",
            content:{
                element:"img",
                attributes:{
                    src:"https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
                    width:150
                }
            },
            button:"jogar novamente"
        }
    ).them(()=>{
        resetGame();
    })
}

function resetGame(){
    playerArrow = [];
    numberOfArows = 10;
    score = 0;
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0.3;
    playerBase = new PlayerBase(300,500,180,150);
    player = new Player(285,playerBase.body.position.y-153,50,180);
    playerArcher = new PlayerArcher(340,playerBase.body.position.y-180,120,120);
    board1 = new Board(width-300,330,50,200);
    board2 = new Board(width-550,height-300,50,200);
    gameState = "play";
}