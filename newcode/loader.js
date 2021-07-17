class loader extends Phaser.Scene
{
    constructor()
    {
        super('loader')
    }

    preload()
    {
        switch (scene)
        {
            case 0:
                console.log(0)
                break
            case 1:
                this.load.audio('lvls', 'assets/music/gameplay.wav')
                this.load.tilemapTiledJSON('map1', 'assets/maps/Leveljuan.json')
                this.load.image('background1', 'assets/backgroundtest.png')
                mapsizex = 5600
                mapsizey = 1600
                
                
                console.log(1)
                break

            case 2:

                this.load.image('background2', '../assets/background2.png')
                this.load.tilemapTiledJSON('map2', '../assets/maps/Leveldos.json')
                mapsizex = 4960
                mapsizey = 2880
                console.log(2)
                break
            
            case 3:
                this.load.audio('gver', '../assets/music/gver.wav')
                console.log(3)
                break
            

        }

    
    }
    
    create(delta)
    {
        var ta
        ta = this.add.text(200, 300, '', { fontSize: '28px', fill: '#FFF' });
        this.add.image(400,200,'loading')
        ta.setText('Click here to continue!')
        ta.setInteractive()
        ta.on('pointerdown', () => this.scene.start('Lvl1'));
    }
    update(delta)
    {
        time = delta
    }
}
