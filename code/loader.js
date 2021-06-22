class loader extends Phaser.Scene
{
    constructor()
    {
        super('loader')
    }

    preload()
    {
        this.load.image('background', 'assets/backgroundtest.png')
        this.load.image('floor', 'assets/Floor.png')
        this.load.image('platform','assets/Platforms.png')
        this.load.image('fuel','assets/fuel.png')
        this.load.image('ring' , 'assets/ring.png')
        this.load.spritesheet('marselo', 'assets/Marselo.png', { frameWidth: 36, frameHeight: 64 })
        this.load.spritesheet('judge', 'assets/Judge.png', { frameWidth: 32, frameHeight: 48 })
        this.load.spritesheet('bird', 'assets/bIRD.png', { frameWidth: 32, frameHeight: 20 })
    }
    
    create()
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
            key: 'bird',
            frames: this.anims.generateFrameNumbers('judge', { start: 0, end: 1 }),
            frameRate: 4,
            repeat: -1
        });

        var ta
        ta = this.add.text(25, 300, '', { fontSize: '28px', fill: '#FFF' });
        ta.setText('Build 0.2 - New Mechanics test - Click here!')
        ta.setInteractive()
        ta.on('pointerdown', () => this.scene.start('Lvl1') ); 
    }
}
