"use strict";
/*
 * Superclass with common functionality
 * @param {string} sprite - A string used to fetch the object's sprite
 * @param {number} x - The enemy's initial x coordinate
 * @param {number} y - The enemy's initial y coordinate
 */
var GameObject = function(sprite, x, y) {
    // Create locals to avoid calling the same func twice.
    var pixelX = this.getPixelX(x);
    var pixelY = this.getPixelY(y);

    this.sprite = sprite;
    this.initialX = pixelX;
    this.initialY = pixelY;
    this.x = pixelX;
    this.y = pixelY;
};

// Draw to screen.
GameObject.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set current location to initial location.
GameObject.prototype.reset = function() {
    this.x = this.initialX;
    this.y = this.initialY;
};

// These helper func converts a 0 based coordinate into a pixel Coordinate.
GameObject.prototype.getPixelX = function (x) {
    var pixX = (x * 101);
    return pixX;
};
GameObject.prototype.getPixelY = function (y) {
    var pixY = (y * 85) - 27;
    return pixY;
};

var Enemy = function(x, y, speed) {
    GameObject.call(this, 'images/enemy-bug.png', x, y);
    this.speed = speed;
};

Enemy.prototype.__proto__ = GameObject.prototype;
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {
    this.x += dt * this.getPixelX(this.speed);
    if (this.x >= this.getPixelX(5)) {
        this.reset();
    }
    // Give the player a little bit of leeway with enemy hitboxes.
    if (((player.x >= this.x - 50) && (player.x <= this.x + 80)) && ((player.y >= this.y - 40) && (player.y <= this.y + 40))) {
        player.reset();
    }
};

var Player = function() {
    GameObject.call(this, 'images/char-boy.png', 2, 5);
};

Player.prototype.__proto__ = GameObject.prototype;
Player.prototype.constructor = Player;
Player.prototype.update = function() {};
Player.prototype.handleInput = function(key) {
    if (key === 'up')
        if (this.y >= this.getPixelY(1)) {
            this.y -= this.getPixelY(1.3);
            if (this.y < this.getPixelY(1))
                this.reset();
        }
    if (key === 'down')
    // The .1 is a fudge as my this.getPixelY is off some pixels
        if (this.y <= this.getPixelY(4.1))
            this.y += this.getPixelY(1.3);
    if (key === 'left')
        if (this.x >= this.getPixelX(1))
            this.x -= this.getPixelX(1);
    if (key === 'right')
        if (this.x <= this.getPixelX(3))
            this.x += this.getPixelX(1);
};

var player = new Player();
var allEnemies = [
    new Enemy(-2, 1, 2),
    new Enemy(-2, 1, 3.5),
    new Enemy(-1.5, 2, 1.5),
    new Enemy(-1, 3, 2),
    new Enemy(-3, 3, 2.5),
];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Modified to allow WASD controls.
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