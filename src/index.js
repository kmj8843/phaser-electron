import Phaser from "phaser";

class MyGame extends Phaser.Scene {
  constructor() {
    super();

    this.cursors = null;
    this.logo = null;
  }

  preload() {
    this.load.setBaseURL("https://labs.phaser.io");

    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.image("red", "assets/particles/red.png");
  }

  create() {
    this.add.image(400, 300, "sky");

    const particles = this.add.particles(0, 0, "red", {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    this.logo = this.physics.add.image(400, 100, "logo");

    // logo.setVelocity(100, 200);
    // logo.setBounce(1, 1);
    // logo.setCollideWorldBounds(true);

    particles.startFollow(this.logo);

    const platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, "red").setScale(2).refreshBody();
    platforms.create(600, 400, "red");
    platforms.create(50, 250, "red");
    platforms.create(750, 220, "red");

    // this.physics.add.collider(this.logo, platforms);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.logo.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.logo.setVelocityX(100);
    } else {
      this.logo.setVelocityX(0);
    }

    if (this.cursors.space.isDown) {
      this.logo.setVelocityY(-200);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  parent: "MyGame",
  width: 800,
  height: 600,
  scene: MyGame,
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 300 } },
  },
};

const game = new Phaser.Game(config);
