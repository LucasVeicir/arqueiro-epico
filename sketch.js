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
    playerBase.display();
    player.display();
    playerArcher.display();
    board1.display();
    board2.display();

    fill("#FFF");
    textAlign("center");
    textSize(40);
    text("arqueiro epico",width/2,100);
}