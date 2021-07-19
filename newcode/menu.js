class menu extends Phaser.Scene
{
    constructor()
    {
        super('menu')
    }

    create()
    {
        this.sound.stopAll()
        mus.play()
        this.add.image(400,300,'mbackground')
        var a = this.add.image(400,450, 'button')
        var b = this.add.image(675,450, 'button2')
        var c = this.add.image(150,450, 'button3')
        var credits = this.add.image(400,100, 'credits')
        var help = this.add.image(400,150, 'help')
        credits.setVisible(false)
        help.setVisible(false)
        a.setInteractive()
        b.setInteractive()
        c.setInteractive()
        a.on('pointerdown', () => this.scene.start('loader'), scene = 1);
        b.on('pointerdown', () =>  this.adas(credits));
        c.on('pointerdown', () =>  this.adas(help));

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