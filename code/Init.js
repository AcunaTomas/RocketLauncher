var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [loader, Lvl1]
    
};

//basic objects
var player;
var floors;
var platforms;
var background;
var rings;
var jugde;
var birds;
var map;
var tileset;
var lvljuan;

//Movement keys
var cursors;
var keya;
var keys;
var keyd;
var keyw;

//Air Movement - Jump and Dash
var launch = 0;
var fueltank;
var speed = 200;
var pwup = false;


//Ring Combo Logic
var hoopcombo;
var comboval = 0;
var score = 0;
var firstpickup
var lastcol;

//Informational - HUD
var combotext;
var coolcam;
var jscore;
var time = 0;
var limit;
//Functionality
var gameover = false



var game = new Phaser.Game(config);
