class menu extends Phaser.Scene
{
    constructor()
    {
        super('menu')
    }

    preload()
    {
        this.load.image('mbackground','assets/title.png')
        this.load.image('button', 'assets/button.png')
        this.load.image('button2', 'assets/button2.png')
        this.load.image('credits', 'assets/credits.png')
    }
    create()
    {
        gover.stop()
        mus.play()
        this.add.image(400,300,'mbackground')
        var a = this.add.image(330,450, 'button')
        var b = this.add.image(575,450, 'button2')
        var credits = this.add.image(400,100, 'credits')
        credits.setVisible(false)
        a.setInteractive()
        b.setInteractive()
        a.on('pointerdown', () => this.scene.start('Lvl1'));
        b.on('pointerdown', () =>  this.adas(credits));

    }
    update(delta)
    {
        time = delta
        lives = 3
    }
    adas(credits)
    {
        if (credits.visible)
        {
            credits.setVisible(false)
        }
        else
        {
            credits.setVisible(true)
        }
    }
}