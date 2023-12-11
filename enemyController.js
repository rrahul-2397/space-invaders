import Enemy from "./Enemy.js";
// import BulletController from "./BulletController.js";
import movingDirection from "./movingDirection.js";
export default class enemyController{
  enemyMap = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ];
      enemyRows = [];

    currentDir = movingDirection.right;
    xVelo = 0;
    yVelo = 0;
    defaultXvelo = 1;
    defaultYvelo = 1;
    moveDowntimeDeflt = 20;
    moveDowntime = this.moveDowntimeDeflt;
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;

    reset() {
      this.enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ];
      this.enemyRows = [];
      this.currentDir = movingDirection.right;
      this.xVelo = 0;
      this.yVelo = 0;
      this.defaultXvelo = 1;
      this.defaultYvelo = 1;
      this.moveDowntimeDeflt = 20;
      this.moveDowntime = this.moveDowntimeDeflt;
      this.fireBulletTimerDefault = 100;
      this.fireBulletTimer = this.fireBulletTimerDefault;
      this.createEnemies();
    }

    constructor(canvas,enemyBulletController, playerBulletController)
    {   this.canvas = canvas;
      this.enemyBulletController = enemyBulletController;
      this.playerBulletController = playerBulletController;
      this.enemyDeathSound = new Audio("sounds/enemy-death.wav");
      this.enemyDeathSound.volume = 0.2;
        this.createEnemies();
    }
    draw(ctx)
    {
      this.decreaseMoveDwnTimer();
      this.updateVeloDirection();
      this.colDetect();
        this.drawEnemies(ctx);
        this.resetMoveDwnTimer();
        this.fireBullet();
 }

      colDetect()
      {
        this.enemyRows.forEach((enemyRow) => {
          enemyRow.forEach((enemy, enemyIndex) => {
            if (this.playerBulletController.collideWith(enemy)) {
              this.enemyDeathSound.currentTime = 0;
              this.enemyDeathSound.play();
              enemyRow.splice(enemyIndex, 1);
            }
          });
        });
    
        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
      }


    fireBullet() {
      this.fireBulletTimer--;
      if (this.fireBulletTimer <= 0) {
        this.fireBulletTimer = this.fireBulletTimerDefault;
        const allEnemies = this.enemyRows.flat();
        const enemyIndex = Math.floor(Math.random() * allEnemies.length);
        const enemy = allEnemies[enemyIndex];
        this.enemyBulletController.shoot(enemy.x + enemy.width / 2, enemy.y, -3);
      }
    }

    resetMoveDwnTimer()
    {
      if (this.moveDowntime <= 0)
      {
        this.moveDowntime = this.moveDowntimeDeflt;
      }
    }

    decreaseMoveDwnTimer()
    {
      if (this.currentDir === movingDirection.dwnLeft || this.currentDir === movingDirection.dwnRight)
        {
          this.moveDowntime--;
        }
      }
    

    updateVeloDirection()
    {
      for(const enemyRow of this.enemyRows)
      {
        if(this.currentDir == movingDirection.right)
        {
          this.xVelo = this.defaultXvelo;
          this.yVelo = 0;
          const rightMostEnmy = enemyRow[enemyRow.length - 1];
          if (rightMostEnmy.x + rightMostEnmy.width >= this.canvas.width)
          {
            this.currentDir = movingDirection.dwnLeft;
            break;

          }
        }
        else if (this.currentDir == movingDirection.dwnLeft)
        {
          this.xVelo = 0;
          this.yVelo = this.defaultYvelo;
          if(this.moveDown(movingDirection.left))
          {
            break;
          }
           
        } else if(this.currentDir === movingDirection.left)
        {
          this.xVelo = -this.defaultXvelo;
          this.yVelo = 0;
          const leftMostEnemy = enemyRow[0];
          if (leftMostEnemy.x <= 0)
          {
            this.currentDir = movingDirection.dwnRight;
            break;
          }
        } else if(this.currentDir === movingDirection.dwnRight)
        {
          if(this.moveDown(movingDirection.right))
          {
            break;
          }
        }
      }
    }
    moveDown(newDirection)
    {
      this.xVelo = 0;
      this.yVelo = this.defaultYvelo;
      if (this.moveDowntime <= 0)
      {
        this.currentDir = newDirection;
        return true;
      }
      return false;
    }

    drawEnemies(ctx) {
        this.enemyRows.flat().forEach((enemy) => {
          enemy.move(this.xVelo, this.yVelo);
          enemy.draw(ctx);
        });
      }
    
    createEnemies() {
        this.enemyMap.forEach((row, rowIndex) => {
          this.enemyRows[rowIndex] = [];
          row.forEach((enemyNubmer, enemyIndex) => {
            if (enemyNubmer > 0) {
              this.enemyRows[rowIndex].push(
                new Enemy(enemyIndex * 60, rowIndex * 40, enemyNubmer)
              );
            }
          });
        });
      }
    
      collideWith(sprite) {
        return this.enemyRows.flat().some((enemy) => enemy.collideWith(sprite));
      }
}