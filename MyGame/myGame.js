/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var platforms;
var player;
var stars;
var cursors;
var explosion;
var explosion2;
var explosion3;

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('explosion', 'assets/exlosion.png', 32, 32);

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sky');
    game.add.sprite(0, 0, 'star');
    explosion = game.add.sprite(100,320, "explosion");
    explosion.enableBody = true;
    explosion.scale.setTo(4,4);
    
    explosion2 = game.add.sprite(150, 320, "explosion");
    explosion2.enableBody = true;
    explosion2.scale.setTo(4, 4);
    
    explosion3 = game.add.sprite(50, 320, "explosion");
    explosion3.enableBody = true;
    explosion3.scale.setTo(4, 4);
    
    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = platforms.create(100, 100, 'ground');
    ledge.body.immovable = true;

    var ledge = platforms.create(0, 450, 'ground');
    ledge.body.immovable = true;

    var ledge = platforms.create(400, 300, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.3;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    explosion.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 10, false);
    explosion2.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 10, false);
    explosion3.animations.add("explode", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39], 10, false);

    stars = game.add.group();

    stars.enableBody = true;

    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 70, 0, 'star');

        star.body.gravity.y = 6;

        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

  
    stars = game.add.group();

    stars.enableBody = true;

    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 70, 0, 'star');

        star.body.gravity.y = 6;

        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
}

function update() {


  game.physics.arcade.collide(stars, platforms);

    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    var hitPlatform = game.physics.arcade.collide(player, platforms);
    cursors = game.input.keyboard.createCursorKeys();
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;

         player.animations.play('left');
    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else {
        player.animations.stop()

        player.frame = 4;
    }
    
    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
        player.body.velocity.y = -350;
    }
    // game.physics.arcade.overlap(player, stars, collectStar, null, this);
}



function collectStar(player, star) {
    star.kill();
    explosion.animations.play("explode")
    explosion2.animations.play("explode")
    explosion3.animations.play("explode")

}