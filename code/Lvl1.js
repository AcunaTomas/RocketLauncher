class Lvl1 extends Phaser.Scene
{
    constructor()
    {
        super('Lvl1')
    }

    create()
    {
        mus.stop() //stops menu music
        gameplay.play()
        //Creation - Camera, Physics Groups, Solid Objects, Controls
        coolcam= this.cameras.main;
        this.cameras.main.setBounds(0,0,5600,1600);
        background = this.add.image(1000,800, 'background');
        background = this.add.image(3000,800, 'background');
        background = this.add.image(5000,800, 'background');

        map = this.make.tilemap({key: 'map1'});
        tileset = map.addTilesetImage('Tilemap1', 'tiles');
        lvljuan = map.createLayer('1', tileset);
        lvljuan.setCollisionBetween(0,2);

        rings = this.physics.add.staticGroup();
        fueltank = this.physics.add.group({});
        birds = this.physics.add.group({})
        Ballon = this.physics.add.staticGroup();

        var t
        for (t=0; t<3; t++)
        {
            if (Math.floor(Math.random() * 10) < 5)
            {
                Ballon.create(2000+(Math.floor(Math.random()*500)),50, 'baloon')
            }
        }
        

        var sp = map.findObject("obj1", obj => obj.name === "sp");
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
        
        deathcause = 0

        cursors = this.input.keyboard.createCursorKeys();
        keya = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyd = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


        hoopcombo = 0
        score = 0
        comboval = 0
        pwup = false
        limit = this.time.delayedCall(120000, this.onEvent, [], this);
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
        this.physics.add.collider(birds, lvljuan);
        this.physics.add.overlap(player, fueltank, this.boost, null, this);
        this.physics.add.overlap(player, jugde, this.endlevel, null, this);
        this.physics.add.overlap(player, rings, this.ringcombo, null, this);
        this.physics.add.overlap(player, birds, this.death, null, this);
        this.physics.add.overlap(player, Ballon, this.lifeup, null, this);

    }

    update(delta)
    {
        if (lvlcomplete)
        {
            gameplay.stop()
            score += comboval*200
            comboval = 0
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
                        this.scene.start('gameoverscr')
                        gameover = false
                        lvlcomplete = false
                        time = delta
                        comboval = 0
                        deathcause = 0
                    }

                    else
                    {
                        this.scene.restart()
                        gameover = false
                        lvlcomplete = false
                        time = delta
                        lives += -1
                        deathcause = 0
                    }

                }
                else
                {
                    this.scene.start('Lvl2')
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
            combotext.setText('Time:' + l.toString().substr(2,4) + ' Combo:' + comboval.toString() + ' Score:' + score.toString() + " Lives: " + lives)
            
    
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
                jump.play()
                launch += -1
            }
    
            
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
        lvlcomplete = true
        deathcause = 1
        hurt.play()
    }

    death(player, bird)
    {
        if (pwup == true)
        {
            pwup = false
            bird.destroy(true,true)
        }
        else
        {
            lvlcomplete = true
            deathcause = 1
            explode.play()
            bird.destroy(true,true)
        }


    }

    lifeup(player,Ballon)
    {
        Ballon.destroy(true,true)
        baloob.play()
        lives+= 1
    }
}