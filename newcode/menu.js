class menu extends Phaser.Scene
{
    constructor()
    {
        super('menu')
    }

    create()
    {
        //mus.play()
        this.add.image(400,300,'mbackground')
        var a = this.add.image(330,450, 'button')
        var b = this.add.image(575,450, 'button2')
        var credits = this.add.image(400,100, 'credits')
        credits.setVisible(false)
        a.setInteractive()
        b.setInteractive()
        a.on('pointerdown', () => this.scene.start('loader'), scene = 2);
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