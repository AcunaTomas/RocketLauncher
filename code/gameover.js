class gameoverscr extends Phaser.Scene
{
    constructor()
    {
        super('gameoverscr')
    }


    create()
    {

        gover.play() 
        var gtext = this.add.text(225, 200, 'GameOver', { fontSize: '58px', fill: '#FFF' })
        var itext = this.add.text(250, 300, 'Main Menu', { fontSize: '28px', fill: '#FFF' })
        gtext.setText("Game Over")
        itext.setText("Go to main menu?")
        itext.setInteractive()
        itext.on('pointerdown', () => this.scene.start('menu'))

    }

}