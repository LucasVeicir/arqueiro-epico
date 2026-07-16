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
}

function draw(){
    background(bgImg);
    playerBase.display();
    player.display();
    playerArcher.display();
}