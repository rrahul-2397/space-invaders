import enemyController from "./enemyController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";
$(document).ready(function() {
    const canvas = $("#game")[0]; 
    const ctx = canvas.getContext("2d"); 
    const background = new Image();
    background.src = "./j2bo0043cyberpunkposter008.jpg";
    
    $(background).on("load", function() {
        canvas.width = 600;
        canvas.height = 600;

        const playerBulletController = new BulletController(canvas,1,"red",true);
        const enemyBulletController = new BulletController(canvas, 4, "white", false);
        const EnemyController = new enemyController(canvas, enemyBulletController, playerBulletController);
        const player = new Player(canvas, 3, playerBulletController);
        let isGameOver = false;
        let didWin = false;

        function game() { 
            checkGameOver();
            ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
            if (!isGameOver)
            {
            EnemyController.draw(ctx);
            player.draw(ctx);
            playerBulletController.draw(ctx);
            enemyBulletController.draw(ctx);

        }
        }

          function restartGame() {
            playerBulletController.reset(); 
            enemyBulletController.reset(); 
            EnemyController.reset(); 
            player.reset(); 
            isGameOver = false;
            didWin = false;
        }

        function checkGameOver()
        {
            if(isGameOver)
            {
                restartGame();
                return;
            }

            if(enemyBulletController.collideWith(player))
            {            isGameOver = true;
            }

            if(EnemyController.collideWith(player))
            {
                isGameOver = true;
            }

            if (EnemyController.enemyRows.length === 0) {
                didWin = true;
                isGameOver = true;
              }
        }

        setInterval(game, 1000/60);
    });
});
