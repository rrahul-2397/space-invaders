export default class player
{

    rghtPressed = false;
    lftPressed = false;
    shootPressed = false;

    handleMouseMove = (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      this.x = mouseX - this.width / 2;
  };

  handleMouseClick = (event) => {
    if (event.button === 0) {
        this.shootBullet();
    }
};

shootBullet() {
  this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
}



    constructor(canvas, velocity, bulletController)
    {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = "images/player.png";

        $(document).on("keydown", this.keydown);
        $(document).on("keyup", this.keyup);
        $(this.canvas).on("mousemove", this.handleMouseMove);
        $(this.canvas).on("mousedown", this.handleMouseClick);

    }

    reset() {
      this.x = this.canvas.width / 2;
      this.y = this.canvas.height - 75;
      this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = "images/player.png";
  }
    draw(ctx) {
        if (this.shootPressed) {
          this.bulletController.shoot(this.x + this.width / 2, this.y, 4, 10);
        }
        this.move();
        this.collideWithWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      }

      collideWithWalls()
      {
        if (this.x < 0)
        {
            this.x = 0;
        }

        if(this.x > this.canvas.width - this.width)
        {

            this.x = this.canvas.width - this.width;
        }

      }

        move()
        {
            if(this.rghtPressed)
            {
                this.x += this.velocity;
            } else if (this.lftPressed)
            {
                this.x += -this.velocity;
            }

        }
      keydown = (event) => {
        if (event.code == "ArrowRight") {
          this.rghtPressed = true;
        }
        if (event.code == "ArrowLeft") {
          this.lftPressed = true;
        }
        if (event.code == "Space") {
          this.shootPressed = true;
        }
      };
    
      keyup = (event) => {
        if (event.code == "ArrowRight") {
          this.rghtPressed = false;
        }
        if (event.code == "ArrowLeft") {
          this.lftPressed = false;
        }
        if (event.code == "Space") {
          this.shootPressed = false;
        }
      };
    }
 