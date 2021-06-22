class Lvl1 extends Phaser.Scene
{
    constructor()
    {
        super('Lvl1')
    }

    create()
    {
        //Creation - Camera, Physics Groups, Solid Objects, Controls
        coolcam= this.cameras.main;
        this.cameras.main.setBounds(0,0,3840,720);
        floors = this.physics.add.staticGroup();
        platforms = this.physics.add.staticGroup();
        cursors = this.input.keyboard.createCursorKeys();
        keya = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyd = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        background = this.add.image(400,300, 'background');
        background = this.add.image(1200,300, 'background');
        background = this.add.image(2000,300, 'background');
        background = this.add.image(2800,300, 'background');
        background = this.add.image(3600,300, 'background');

        hoopcombo = 0


        //HUD
        combotext = this.add.text(16, 16, '', { fontSize: '28px', fill: '#000' });
        combotext.scrollFactorX = 0
        combotext.scrollFactorY = 0

        jugde = this.physics.add.staticGroup()

        fueltank = this.physics.add.group({
            key: 'fuel',
            repeat: 0,
            setXY: { x: 1800, y: 0, stepX: 30 }
        });
        fueltank.children.iterate(function (child) {
            child.setBounceY(0);
        })

        rings = this.physics.add.staticGroup();
        var asd = 0
        var rx = 300
        var ry = 100
        platforms.create(150,400, 'platform').setScale(2.0).refreshBody();
        for (asd = 0; asd<17; asd++)
        {
            ry = 100+ Math.floor(Math.random() *400)
            rings.create(rx,ry, 'ring').setScale(0.5).refreshBody();

            if (Math.floor((Math.random() * 5)) > 2)
            {
                platforms.create(rx,ry + 30, 'platform').setScale(2.0).refreshBody();
            }
            rx+= 200

        }
        

        var i = 0
        for (i=0;i<160;i++)
        {
            floors.create(27*i,586, 'floor');
        }
        player = this.physics.add.sprite(150,525,'marselo');

        //Colliders
        this.physics.add.collider(player, floors);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(rings, floors);
        this.physics.add.collider(fueltank, floors);
        this.physics.add.collider(fueltank, platforms);
        this.physics.add.overlap(player,fueltank, this.boost, null, this);
        this.physics.add.overlap(player,rings, this.ringcombo, null, this);


    }

    update(delta)
    {
        if (gameover)
        {
            combotext.setText('Final score:' + score + ' Rings Collected: ' + lastring + ' Judges Rating:')
            jugde.create(400,300, 'judges').scrollFactorX(0).scrollFactorY(0);

        }
        coolcam.centerOn(player.x,0);
        var lastring = delta - hoopcombo

            if (comboval == 1 && firstpickup == true)
            {
                hoopcombo = delta
                firstpickup = false
            }
            else if (lastring <= 10000 && lastring < comboval)
            {
            hoopcombo = delta;
            }
            else if (lastring > 10000 || comboval >= 10)
            {
            score += comboval*200;
            comboval = 0;
            }


        combotext.setText('Time:' + lastring.toString().substr(0,2) + ' Combo:' + comboval.toString() + ' Score:' + score.toString())
        

        if (player.body.blocked.down)
        {
            if (pwup == true)
            {
                launch = 2
            }
            else
            {
                launch = 1
            }
        }


        if (keya.isDown)
        {
            player.x += -2.5
        }
        else if (keyd.isDown)
        {
            player.x += 2.5
            player.anims.play('right', true)
        }
        if (player.body.blocked.down)
        {
            player.setVelocityX(0);
        }

        if (cursors.space.isDown && player.body.blocked.down)
        {
            player.setVelocityY(-220)
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.left) && launch > 0 && player.body.blocked.down == false)
        {
            player.setVelocityX(-150)
            launch += -1
            console.log(launch)
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.right) && launch > 0 && player.body.blocked.down == false)
        {
            player.setVelocityX(150)
            launch += -1
        }
        if (Phaser.Input.Keyboard.JustDown(cursors.up) && launch > 0 && player.body.blocked.down == false)
        {
            player.setVelocityY(-300)
            launch += -1
        }



    }

    boost(player, fueltank)
    {
        fueltank.destroy(true,true);
        pwup = true
    }
    
    ringcombo(player, rings)
    {
        rings.destroy(true,true);
        lastcol = lastcol + comboval
        comboval += 1;
        if (comboval == 1)
        {
            firstpickup = true
        }
        else
        {
            firstpickup = false
        }

    }
}