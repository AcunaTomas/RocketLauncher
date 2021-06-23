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
        this.cameras.main.setBounds(0,0,5600,1600);
        background = this.add.image(1000,800, 'background');
        background = this.add.image(3000,800, 'background');
        background = this.add.image(5000,800, 'background');

        map = this.make.tilemap({key: 'map1'});
        tileset = map.addTilesetImage('Tilemap1', 'tiles');
        lvljuan = map.createStaticLayer('1', tileset);
        lvljuan.setCollisionBetween(0,2);

        rings = this.physics.add.staticGroup();
        fueltank = this.physics.add.group({});
        birds = this.physics.add.group({})

        var sp = map.findObject("obj1", obj => obj.name === "sp");
        var aea = map.createFromObjects("obj1", name = "Tank" ,{key : 'fuel'})
        fueltank.addMultiple(aea, true)
        var rgs = map.createFromObjects("rings",name = "ring" ,{key:'ring'})
        rings.addMultiple(rgs, true)
        rings.children.iterate(function (child)
        {
            child.setScale(0.5)

        })
        var bds = map.createFromObjects("birds", name='bird', {key:'bird'})
        birds.addMultiple(bds, true)


        cursors = this.input.keyboard.createCursorKeys();
        keya = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyd = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


        hoopcombo = 0
        score = 0
        pwup = false
        limit = new Phaser.Time.TimerEvent({ delay: 60000 });
        this.time.addEvent(limit);

        //HUD
        combotext = this.add.text(16, 16, '', { fontSize: '28px', fill: '#000' });
        combotext.scrollFactorX = 0
        combotext.scrollFactorY = 0

        jugde = this.physics.add.staticGroup();
        jugde.create(5575, 1500, 'judge');
        jscore = this.add.text(300, 400, '', { fontSize: '72px', fill: '#000' });
        jscore.setScrollFactor(0);
        

        player = this.physics.add.sprite(sp.x,sp.y,'marselo');

        //Colliders
        this.physics.add.collider(player, lvljuan);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(fueltank, lvljuan);

        this.physics.add.overlap(player, fueltank, this.boost, null, this);
        this.physics.add.overlap(player, jugde, this.endlevel, null, this);
        this.physics.add.overlap(player, rings, this.ringcombo, null, this);


    }

    update(delta)
    {
        if (gameover)
        {
            combotext.setText('Final score:' + score + ' Rings Collected: ' + lastring + ' Judges Rating:')
            this.physics.pause()
            jugde.create(400,500, 'judge').setScrollFactor(0).setScale(5.0).anims.play('judging');
            if (score >= 1500)
            {
                jscore.setText('Pass')
            }
            else
            {
                jscore.setText('Fail')
            }
            if (Phaser.Input.Keyboard.JustDown(cursors.space))
            {
                this.scene.restart()
                gameover = false
                time = delta
                
            }
        }
        coolcam.centerOn(player.x,player.y);
        
        var rt = delta - time

        var lastring = rt - hoopcombo

            if (comboval == 1 && firstpickup == true)
            {
                hoopcombo = rt
                firstpickup = false
            }
            else if (lastring <= 10000 && lastring < comboval)
            {
            hoopcombo = rt;
            }
            else if (lastring > 10000 || comboval >= 10)
            {
            score += comboval*200;
            comboval = 0;
            }

        var l = limit.getProgress();
        combotext.setText('Time:' + l.toString().substr(0,5) + ' Combo:' + comboval.toString() + ' Score:' + score.toString())
        

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
            player.setVelocityX(-200)
            player.anims.play('right', true)
            player.flipX = true
        }
        else if (keyd.isDown)
        {
            player.setVelocityX(200)
            player.anims.play('right', true)
            player.flipX = false
        }
        else
        {
            player.setVelocityX(0);
            player.anims.play('idle', true)
        }

        if (cursors.space.isDown && player.body.blocked.down)
        {
            player.setVelocityY(-300)
        }

        if (Phaser.Input.Keyboard.JustDown(cursors.space) && launch > 0 && player.body.blocked.down == false)
        {
            player.setVelocityY(-400)
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

    endlevel(player,judge)
    {
        gameover = true
    }

}