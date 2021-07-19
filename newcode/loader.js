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
                console.log(3)
                break
            

        }

    
    }
    
    create(delta)
    {
        this.sound.stopAll();
        var ta
        ta = this.add.text(125, 300, '', { fontSize: '28px', fill: '#FFF' });
        var hint = this.add.text(120, 50, 'Consejo: al agarrar un aro,\nse te otorga un periodo de 10 segundos\nen el que conseguiras mas puntos de lo normal', { fontSize: '22px', fill: '#FFF' });
        this.add.image(400,200,'loading')
        var bt = this.add.image(400,525, 'button')
        bt.setInteractive()
        ta.setText('Objetivo: Conseguir 2000 puntos y \nllegar a la meta!\nLimite de tiempo: 100 segundos!')
        ta.setInteractive()
        bt.on('pointerdown', () => this.scene.start('Lvl1'));
    }
    update(delta)
    {
        time = delta
    }
}
