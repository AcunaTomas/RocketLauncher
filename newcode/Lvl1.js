class Lvl1 extends Phaser.Scene
{
    constructor()
    {
        super('Lvl1')
    }

    create()
    {
        gameplay.play()
        //Creation - Camera, Physics Groups, Solid Objects, Controls

        coolcam= this.cameras.main;
        this.cameras.main.setBounds(0,0,mapsizex,mapsizey);
        background = this.add.image(mapsizex/2,mapsizey/2, 'background' + scene.toString());


        //Load Tilemaps
        mapx = this.make.tilemap({key: ('map' + scene.toString())})
        tilemapx = mapx.addTilesetImage('Tilemap' + scene.toString(), 'tile' + scene.toString(), 32, 32)

        //Parse Level Data and Objects
        lvljuan = mapx.createLayer('1', tilemapx);
        lvljuan.setCollisionByProperty({collides : true});

        rings = this.physics.add.staticGroup();
        fueltank = this.physics.add.group({});
        birds = this.physics.add.group({})
        Ballon = this.physics.add.staticGroup();

        var t
        for (t=0; t<1; t++)
        {
            if (Math.floor(Math.random() * 10) < 5)
            {
                Ballon.create(2000+(Math.floor(Math.random()*500)),50, 'baloon')
            }
        }
        
        var tnks = mapx.createFromObjects('tank', name= 'Tank', {key:'fuel'})
        fueltank.addMultiple(tnks, true)
        fueltank.children.iterate(function (child)
        {
            child.anims.play('tank')
        })


        var sp = mapx.findObject("obj1", obj => obj.name === "sp");
        var jp = mapx.findObject("obj1", obj => obj.name === "jp");
        console.log(sp)
        var rgs = mapx.createFromObjects("rings",name = "ring" ,{key:'ring'})
        rings.addMultiple(rgs, true)
        rings.children.iterate(function (child)
        {
            child.setScale(0.5)
            child.anims.play('rign')

        })
        var bds = mapx.createFromObjects("birds", name='bird', {key:'bird'})
        birds.addMultiple(bds, true)
        birds.children.iterate(function (child)
        {
            child.body.setGravity(0,0)
            child.body.allowGravity = false
            child.anims.play('bird')

        }
        )
        
        //Reset Game State Variables

        deathcause = 0
        lvlcomplete = false
        hoopcombo = 0
        score = 0
        comboval = 0
        pwup = false
        firstpickup = false;


        //Controls

        cursors = this.input.keyboard.createCursorKeys();
        keya = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyd = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        //Timers
        limit = this.time.addEvent({delay: 100000, callback: this.onEvent});
        combolimit = new Phaser.Time.TimerEvent({ delay: 10000, callback: this.endcombo})
        this.time.addEvent(limit);

        //HUD
        combotext = this.add.text(32, 50, '', { fontSize: '28px', fill: '#000' });
        timetext = this.add.text(40, 8, '', { fontSize: '28px', fill: '#000' });
        timetext.scrollFactorX = 0
        timetext.scrollFactorY = 0
        var clock = this.add.image(16,16, 'clock')
        var hudring = this.add.image(16,55, 'ring').setScale(0.3)
        hudring.scrollFactorX = 0
        hudring.scrollFactorY = 0
        clock.scrollFactorX = 0
        clock.scrollFactorY = 0
        combotext.scrollFactorX = 0
        combotext.scrollFactorY = 0

        //Collision

        player = this.physics.add.sprite(sp.x,sp.y,'marselo');

        jugde = this.physics.add.staticGroup();
        jscore = this.add.text(300, 400, '', { fontSize: '72px', fill: '#000' });
        jscore.setScrollFactor(0);
        
        jhud = this.physics.add.staticGroup();
        jhud.create(400,500, 'judge').setScrollFactor(0).setScale(2.0).anims.play('judging').setVisible(false);


        jugde.create(jp.x, jp.y, 'judge');

        //Colliders
        this.physics.add.collider(player, lvljuan);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(fueltank, lvljuan);
        this.physics.add.collider(birds, lvljuan);
        this.physics.add.overlap(player, fueltank, this.boost, null, this);
        this.physics.add.overlap(player, jugde, this.endlevel, null, this);
        this.physics.add.overlap(player, rings, this.ringcombo, null, this);
        this.physics.add.overlap(player, birds, this.death, null, this);
        this.physics.add.overlap(player, Ballon, this.lifeup, null, this);



    }

    update(delta)
    {
        if (lvlcomplete) //Ugly Scene Changer
        {
            this.gameover()
            gameplay.stop()
            if (Phaser.Input.Keyboard.JustDown(cursors.space))
            {
                if (deathcause == 0)
                {
                    if (score >= 2000)
                    {
                        if (scene < 2)
                        {
                            scene += 1
                            this.scene.start('loader')
                        }
                        else
                        {
                            this.scene.start('menu')
                        }

                    }
                    else
                    {
                        if (lives > 1)
                        {
                            lives += -1
                            this.scene.restart()
                        }
                        else
                        {
                            this.scene.start('gameoverscr')
                        }

                    }

                }
                else
                {
                    if (lives > 1)
                        {
                            lives += -1
                            this.scene.restart()
                        }
                        else
                        {
                            this.scene.start('gameoverscr')
                        }
                }
            }
        }
        else
        {
            coolcam.centerOn(player.x,player.y);

            if (player.y > mapsizey)
            {
                deathcause = 1
                this.endlevel()
            }

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
                player.flipX = true
                if (player.body.blocked.down)
                {
                    player.anims.play('right', true)
                }

            }
            else if (keyd.isDown)
            {
                player.setVelocityX(200)
                player.flipX = false
                if (player.body.blocked.down)
                {
                    player.anims.play('right', true)
                }
            }
            else
            {
                player.setVelocityX(0);
                if (player.body.blocked.down)
                {
                    player.anims.play('idle', true)
                }

            }
            


            if (cursors.space.isDown && player.body.blocked.down)
            {
                player.setVelocityY(-300)
                player.anims.play('jump')
            }
            if (keys.isDown && player.body.blocked.down == false)
            {
                player.setVelocityY(500)
                player.anims.play('idle')
            }


            if (Phaser.Input.Keyboard.JustDown(cursors.space) && launch > 0 && player.body.blocked.down == false)
            {
                player.setVelocityY(-400)
                jump.play()
                launch += -1
            }
            

            if (scene > 1)
            {
                birds.children.iterate(function (child)
                {
                    if (player.x - child.x < 30 && player.y - child.y < 60)
                    {
                        child.body.setVelocityX(-75)
                        child.body.setAccelerationX(-5)
                        child.flipX = false
                    }
                    else if (child.x - player.x < -30 && player.y - child.y > 60)
                    {
                        child.body.setVelocityX(75)
                        child.body.setAccelerationX(5)
                        child.flipX = true
                    }
                    else
                    {
                        child.body.setVelocityX(0)
                        child.body.setAccelerationX(0)
                    }
                })
            }

            combotext.setText(':' + comboval.toString() + ' Score:' + score.toString() + " Lives: " + lives)
            timetext.setText(':' + limit.getProgress().toString().substr(2,2))



        }


    }

    boost(player, fueltank)
    {
        fueltank.destroy(true,true);
        pwup = true
        power.play()
    }
    
    ringcombo(player, rings)
    {
        rings.destroy(true,true);
        ringsnd.play()
        comboval += 1;
        score += 100 + (100*comboval);

        if (firstpickup)
        {

        }
        else
        {
            combolimit = new Phaser.Time.TimerEvent({ delay: 10000, callback: this.endcombo});
            this.time.addEvent(combolimit);
        }
        firstpickup = true;


    }

    endcombo()
    {
        firstpickup = false
        comboval = 0
    }

    endlevel(player,judge)
    {
        lvlcomplete = true

    }
    
    onEvent()
    {
        lvlcomplete = true
        deathcause = 1
        hurt.play()
    }

    death(player, bird)
    {
        if (pwup == true)
        {
            pwup = false
        }
        else
        {
            player.anims.play('death')
            explode.play()
            lvlcomplete = true
            deathcause = 1

        }
        bird.destroy(true,true)

    }

    lifeup(player,Ballon)
    {
        Ballon.destroy(true,true)
        baloob.play()
        lives+= 1
    }

    gameover()
    {
        this.physics.pause()
        if (score >= 2000 && deathcause == 0)
        {
            jhud.children.iterate(function (jhud)
            {
                jhud.anims.play('yay')
                jhud.setVisible(true)
            })


        }
        else
        {
            jhud.children.iterate(function (jhud)
            {
                jhud.anims.play('nay')
                jhud.setVisible(true)
            })
        }
    }
}