function getPixelX(x) {
    var pixX = (x * 101);
    return pixX;
}

function getPixelY(y) {
    var pixY = (y * 85) - 27;
    return pixY;
}

/*
 * Enemies our player must avoid
 * @param {number} x - The enemy's initial x coordinate
 * @param {number} y - The enemy's initial y coordinate
 */
var Enemy = function(x, y, speed) {
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.x = getPixelX(x);
    this.y = getPixelY(y);
};

/*
 * Update the enemy's position, required method for game
 * @param {number} dt - A time delta between ticks. 
 */
Enemy.prototype.update = function(dt) {
    this.x += dt * getPixelX(this.speed);
    if (this.x >= getPixelX(5)) {
        this.x = getPixelX(-1);
    }
    // Give the player a little bit of leeway with enemy hitboxes.
    if (((player.x >= this.x-50) && (player.x <= this.x + 80)) && ((player.y >= this.y - 40) && (player.y <= this.y + 40))) {
        player.respawn();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = getPixelX(2);
    this.y = getPixelY(5);
};
Player.prototype.update = function() {};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.respawn = function () {
    this.x = getPixelX(2);
    this.y = getPixelY(5);
};
Player.prototype.handleInput = function(key) {
    if (key === 'up')
        if (player.y >= getPixelY(1)){
            player.y -= getPixelY(1.3);
            if (player.y < getPixelY(1))
                player.respawn();
        }
    if (key === 'down')
    // The .1 is a fudge as my getPixelY is off some pixels
        if (player.y <= getPixelY(4.1))
            player.y += getPixelY(1.3);
    if (key === 'left')
        if (player.x >= getPixelX(1))
            player.x -= getPixelX(1);
    if (key === 'right')
        if (player.x <= getPixelX(3))
            player.x += getPixelX(1);
};

var player = new Player();
var allEnemies = [
    new Enemy(-1, 1, 1),
    new Enemy(-2, 1),
    new Enemy(-1, 2),
    new Enemy(-1, 3),
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
    player.handleInput(allowedKeys[e.keyCode]);
});