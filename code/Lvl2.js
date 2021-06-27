class Lvl2 extends Phaser.Scene
{
    constructor()
    {
        super('Lvl2')
    }

    create()
    {
        //Creation - Camera, Physics Groups, Solid Objects, Controls
        coolcam= this.cameras.main;
        this.cameras.main.setBounds(0,0,4850,2875);
        background = this.add.image(2500,1600, 'background2')

        map = this.make.tilemap({key: 'map2'});
        tileset = map.addTilesetImage('Tilemap2', 'tile2');
        lvldos = map.createLayer('Tile Layer 1', tileset);
        lvldos.setCollisionBetween(0,1);
        lvldos.setCollisionBetween(1,12);

        rings = this.physics.add.staticGroup();
        fueltank = this.physics.add.group({});
        birds = this.physics.add.group({})

        var sp = map.findObject("obj1", obj => obj.name === "sp");
        var jp = map.findObject('obj1', obj => obj.name === "jp")
        var aea = map.createFromObjects("tank", name = "Tank" ,{key : 'fuel'})
        fueltank.addMultiple(aea, true)
        fueltank.children.iterate(function (child)
        {
            child.anims.play('tank')

        })
        var rgs = map.createFromObjects("rings",name = "ring" ,{key:'ring'})
        rings.addMultiple(rgs, true)
        rings.children.iterate(function (child)
        {
            child.setScale(0.5)
            child.anims.play('rign')

        })
        var bds = map.createFromObjects("birds", name='bird', {key:'bird'})
        birds.addMultiple(bds, true)
        birds.children.iterate(function (child)
        {
            child.body.setGravity(0,0)
            child.body.allowGravity = false
            child.anims.play('bird')

        }
        )

        cursors = this.input.keyboard.createCursorKeys();
        keya = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyd = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        deathcause = 0
        hoopcombo = 0
        score = 0
        pwup = false
        limit = this.time.delayedCall(120000, this.onEvent, [], this);;
        this.time.addEvent(limit);

        //HUD
        combotext = this.add.text(16, 16, '', { fontSize: '28px', fill: '#000' });
        combotext.scrollFactorX = 0
        combotext.scrollFactorY = 0

        jugde = this.physics.add.staticGroup();
        jugde.create(jp.x, jp.y, 'judge');
        jscore = this.add.text(300, 400, '', { fontSize: '72px', fill: '#000' });
        jscore.setScrollFactor(0);
        

        player = this.physics.add.sprite(sp.x,sp.y,'marselo');

        //Colliders
        this.physics.add.collider(player, lvldos);
        this.physics.add.collider(fueltank, lvldos);
        this.physics.add.collider(birds, lvldos);
        this.physics.add.overlap(player, fueltank, this.boost, null, this);
        this.physics.add.overlap(player, jugde, this.endlevel, null, this);
        this.physics.add.overlap(player, rings, this.ringcombo, null, this);
        this.physics.add.overlap(player, birds, this.death, null, this);


    }

    update(delta)
    {
        if (player.y > 2900)
        {
            this.death()
        }
        if (lvlcomplete)
        {
            if (deathcause == 0)
            {
                combotext.setText('Final score:' + score + ' Judges Rating:')
                this.physics.pause()
                jugde.create(400,500, 'judge').setScrollFactor(0).setScale(5.0).anims.play('judging');
                jugde.children.iterate(function (child)
                {
                    if (score >= 1500)
                    {
                        child.anims.play('yay')
                        gameover = false
                    }
                    else
                    {
                        child.anims.play('nay')
                        gameover = true
                    }
        
                })
            }
            else
            {
                gameover = true
                player.anims.play('death')
            }
            if (Phaser.Input.Keyboard.JustDown(cursors.space))
            {
                if (gameover)
                {
                    if (lives < 1)
                    {
                        this.scene.start('menu')
                        gameover = false
                        lvlcomplete = false
                        time = delta
                    }

                    else
                    {
                        this.scene.restart()
                        gameover = false
                        lvlcomplete = false
                        time = delta
                        lives += -1
                    }

                }
                else
                {
                    this.scene.start('menu')
                    gameover = false
                    lvlcomplete = false
                }
                
            }
        }
        else
        {
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
        combotext.setText('Time:' + l.toString().substr(2,4) + ' Combo:' + comboval.toString() + ' Score:' + score.toString() + ' Lives: ' + lives)
        

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

        birds.children.iterate(function (child)
        {
            if (player.x - child.x < 30 && player.y - child.y < 60)
            {
                child.body.setVelocityX(-75)
                child.body.setAccelerationX(-5)
            }
            else if (child.x - player.x < -30 && player.y - child.y > 60)
            {
                child.body.setVelocityX(75)
                child.body.setAccelerationX(5)
            }
            else
            {
                child.body.setVelocityX(0)
                child.body.setAccelerationX(0)
            }
        }
        )

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
        lvlcomplete = true
    }
    onEvent()
    {
        lives += -1
        if (lives < 1)
        {
            lvlcomplete = true
        }
        else
        {
            this.scene.restart()
            score = 0
        }
        
    }

    death()
    {
        lives += -1
        if (lives < 1)
        {
            lvlcomplete = true
            score = 0
        }
        else
        {
            this.scene.restart()
        }
    }
}