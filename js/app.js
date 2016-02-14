function getPixelX(x) { 
    var pixX = (x * 101);
    return pixX;
}
function getPixelY(y) {
    var pixY = (y * 85) - 27;
    return pixY;
}

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 * Enemies our player must avoid
 * @param {number} x - The enemy's initial x coordinate
 * @param {number} y - The enemy's initial y coordinate
*/
var Enemy = function (x, y) {
    this.speed = this.setSpeed(getRandomInt(1, 3));
    this.sprite = 'images/enemy-bug.png';
    this.x = getPixelX(x);
    this.y = getPixelY(y);
};
/*
 * Sets an enemies speed. Abstracting this function both keeps the constructor clean and allows for the potential of changing an enemies speed midgame.
 * @param {number} speed - An int that indicates how fast the enemy should go. Acceptable values are 1, 2, and 3.
*/
Enemy.prototype.setSpeed = function (speed) {
    // Sanitize input by ensuring it as in int, then clamp it between 1 and 3.
    speed = Math.floor(speed);
    speed = (speed < 1) ? 1 : speed;
    speed = (speed > 3) ? 3 : speed;

    var movementRate;
    if (speed === 1)
        movementRate = .1;
    if (speed === 2)
        movementRate = .5;
    else
        movementRate = 1;
    return movementRate;
};
/*
 * Update the enemy's position, required method for game
 * @param {number} dt - A time delta between ticks. 
*/
Enemy.prototype.update = function (dt) {
    this.x += dt * getPixelX(this.speed);
    if (this.x >= getPixelX(5))
        this.x = getPixelX(-1);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = getPixelX(2);
    this.y = getPixelY(5);
};
Player.prototype.update = function () {
    //TODO: Write this function
    
};
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function (key) {
    //TODO: Write this function
    console.log(key);
    if (key === 'up') {
        player.y -= getPixelY(1.3);
    };
    if (key === 'down') {
        player.y += getPixelY(1.3);
    };
    if (key === 'left') {
        player.x -= getPixelX(1);
    };
    if (key === 'right') {
        player.x += getPixelX(1);
    };
};


var player = new Player();
var allEnemies = [
    new Enemy(-1, 1),
    new Enemy(-1, 3),    new Enemy(-1, 1),
    new Enemy(-1, 3),    new Enemy(-1, 1),
    new Enemy(-1, 3),    new Enemy(-1, 1),
    new Enemy(-1, 3),    new Enemy(-1, 1),
    new Enemy(-1, 3)
];
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        38: 'up',
        87: 'up',
        83: 'down',
        40: 'down',
        37: 'left',
        65: 'left',
        39: 'right',
        68: 'right'
    };
    console.log(e);
    player.handleInput(allowedKeys[e.keyCode]);
});
