var config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },

    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [loader,menu, Lvl1, Lvl2, gameoverscr]
    
};

//basic objects
var player;
var floors;
var platforms;
var background;
var rings;
var jugde;
var birds;
var Ballon;
var map;
var tileset;
var lvljuan;
var lvldos;


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
var lvlcomplete = false
var paths
var lives = 3
var deathcause = 0


//Music
var mus
var gameplay
var gover

//Sounds
var jump
var hurt
var explode
var power
var ringsnd
var baloob

var game = new Phaser.Game(config);
