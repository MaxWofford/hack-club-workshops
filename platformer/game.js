var GROUND_SPRITE_WIDTH = 50;
var GROUND_SPRITE_HEIGHT = 50;
var GRAVITY = 0.3;
var JUMP = -5;

var groundSprites;
var numGroundSprites;
var player;
var obstacleSprites;
var isGameOver;
var score;

function setup()
{
    createCanvas(400, 300);
    background(150, 200, 250);
    
    //Score starts as 0
    score = 0;
    
    //Game is not over at the start
    isGameOver = false;
    
    //Player
    player = createSprite(100, height - 75, 50, 50);
    
    //Obstacles
    obstacleSprites = new Group();
    
    //Ground sprite group
    groundSprites = new Group();
    
    //Gets the numer of ground sprites needed to fill screen
    numGroundSprites = width / GROUND_SPRITE_WIDTH;
    
    //Adds number of ground sprites to ground sprite group
    for (var n = 0; n < numGroundSprites; n++)
    {
        var groundSprite = createSprite(n * 50, height - 25, GROUND_SPRITE_WIDTH, GROUND_SPRITE_HEIGHT);
        groundSprites.add(groundSprite);
    }
}

function draw()
{
    if (isGameOver)
    {
        background(0);
        fill(255);
        textAlign(CENTER);
        text("Game Over! Click anywhere to restart", camera.position.x, camera.position.y);
        text("Your score was: " + score, camera.position.x, camera.position.y - 20);
    }
    else
    {
        //Redraw background
        background(150, 200, 250);
        
        //Establish Gravity for jump
        player.velocity.y += GRAVITY;
        
        //Prevent player from falling through ground
        if (groundSprites.overlap(player))
        {
            player.velocity.y = 0;
            player.position.y = (height - 50) - (player.height/2);
        }
        
        //Jump
        if (keyDown(UP_ARROW))
        {
            player.velocity.y = JUMP;
        }
        
        //Draw sprite
        drawSprites();
        
        //Adds to score
        score += 1;
        
        //Shows score
        textAlign(CENTER);
        text(score, camera.position.x, 10);
    
        //Player Movement
        player.position.x += 5;
        
        //Camera follows player
        camera.position.x = player.position.x;
        
        //Create obstacles
        if (random() > 0.95)
        {
            var obstacle = createSprite(camera.position.x + width, random(0, (height - 50) - 15), 30, 30);
            obstacleSprites.add(obstacle);
        }
        
        //Remove obstacle when it is off screen
        var firstObstacle = obstacleSprites[0];
        if (obstacleSprites.length > 0 && firstObstacle.position.x <= camera.position.x - (width/2 + firstObstacle.width/2))
        {
            removeSprite(firstObstacle);
        }
        
        //Move ground sprite to the front
        var firstGroundSprite = groundSprites[0];
        if (firstGroundSprite.position.x <= camera.position.x - (width/2 + firstGroundSprite.width/2))
        {
            groundSprites.remove(firstGroundSprite);
            firstGroundSprite.position.x += numGroundSprites * firstGroundSprite.width;
            groundSprites.add(firstGroundSprite);
        }
        
        //Ends the game if collision
        obstacleSprites.overlap(player, endGame);
    }
    
}

function endGame()
{
    isGameOver = true;
    console.log("Game Over!");
}


//Restart game
function mouseClicked()
{
    if (isGameOver)
    {
        //Reset score
        score = 0;
        
        //Resets position of ground sprites
        for (var n = 0; n < numGroundSprites; n++)
        {
            var groundSprite = groundSprites[n];
            groundSprite.position.x = n * 50;
        }
        
        //Reset player position
        player.position.x = 100;
        player.position.y = height - 75;
        
        //Removes obstacles
        obstacleSprites.removeSprites();
        
        //Change bool so game is not over
        isGameOver = false;
    }
}