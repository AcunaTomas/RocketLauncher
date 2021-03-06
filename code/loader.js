class loader extends Phaser.Scene
{
    constructor()
    {
        super('loader')
    }

    preload()
    {
        //music
        this.load.audio('gver', 'assets/music/gver.wav')
        this.load.audio('menu', 'assets/music/menu.wav')
        this.load.audio('lvls', 'assets/music/gameplay.wav')
        //sounds
        this.load.audio('jump', 'assets/music/jump.wav')
        this.load.audio('hurt', 'assets/music/hurtt.wav')
        this.load.audio('explode', 'assets/music/explode.wav')
        this.load.audio('pwup', 'assets/music/powerup.wav')
        this.load.audio('rings', 'assets/music/ring.wav')
        this.load.audio('baloons', 'assets/music/baloob.wav')
        //images
        this.load.image('loading', 'assets/loadket.png')
        this.load.image('background', 'assets/backgroundtest.png')
        this.load.image('floor', 'assets/Floor.png')
        this.load.image('baloon', 'assets/Ballon.png')
        this.load.image('platform','assets/Platforms.png')
        this.load.spritesheet('fuel','assets/fuel.png', {frameWidth: 32, frameHeight: 32})
        this.load.spritesheet('ring' , 'assets/ring.png', {frameWidth: 52, frameHeight: 133})
        this.load.spritesheet('marselo', 'assets/Marselo.png', { frameWidth: 36, frameHeight: 64 })
        this.load.spritesheet('judge', 'assets/Judge.png', { frameWidth: 32, frameHeight: 48 })
        this.load.spritesheet('bird', 'assets/bIRD.png', { frameWidth: 32, frameHeight: 20 })
        this.load.image('tiles', 'assets/maps/Tilemap1.png')
        this.load.image('tile2', 'assets/maps/Tilemap2.png')
        this.load.image('background2', 'assets/background2.png')
        this.load.tilemapTiledJSON('map1', 'assets/maps/Leveljuan.json')
        this.load.tilemapTiledJSON('map2', 'assets/maps/Leveldos.json')
    }
    
    create(delta)
    {
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('marselo', { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
            });
    
            this.anims.create({
            key: 'idle',
            frames: [ { key: 'marselo', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'death',
            frames: this.anims.generateFrameNumbers('marselo', { start: 3, end: 5 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'judging',
            frames: this.anims.generateFrameNumbers('judge', { start: 1, end: 1 }),
            frameRate: 6,
            repeat: -1
            });
    
        this.anims.create({
            key: 'judgle',
            frames: [ { key: 'judge', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'yay',
            frames: [ { key: 'judge', frame: 2 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'nay',
            frames: [ { key: 'judge', frame: 3 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'bird',
            frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'rign',
            frames: this.anims.generateFrameNumbers('ring', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        });
        
        this.anims.create({
            key: 'tank',
            frames: this.anims.generateFrameNumbers('fuel', { start: 0, end: 0 }),
            frameRate: 4,
            repeat: -1
        });

        gameplay = this.sound.add('lvls')
        mus = this.sound.add('menu')
        gover = this.sound.add('gver')


        jump = this.sound.add('jump')
        hurt = this.sound.add('hurt')
        explode = this.sound.add('explode')
        power = this.sound.add('pwup')
        ringsnd = this.sound.add('rings')
        baloob = this.sound.add('baloons')

        var ta
        ta = this.add.text(200, 300, '', { fontSize: '28px', fill: '#FFF' });
        this.add.image(400,200,'loading')
        ta.setText('Click here to continue!')
        ta.setInteractive()
        ta.on('pointerdown', () => this.scene.start('menu')); 
    }
    update(delta)
    {
        time = delta
    }
}
