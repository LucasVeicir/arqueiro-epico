const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

let engine;
let world;
let canvas;
let bgImg;

function preload(){
    bgImg = loadImage('assets/background.png')
}

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
    world = engine.world;
}

function draw(){
    background(bgImg);
}