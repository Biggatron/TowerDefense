// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// Construct a "sprite" from the given `image`,
function Sprite(image, numberOfFrames = 1) {
    this.image = image;

    this.numberOfFrames = numberOfFrames;
    this.width = image.width;
    this.height = image.height/numberOfFrames;

    this.scale = 1;
}

Sprite.prototype.drawAt = function (ctx, x, y) {
    ctx.drawImage(this.image,
                  x, y);
};

Sprite.prototype.drawAt = function (ctx, x, y, x2, y2) {
    ctx.drawImage(this.image, x, y, x2, y2);
};

Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation, opacity) {
    if (rotation === undefined) rotation = 0;
    if (opacity === undefined) opacity = 1;

    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    ctx.globalAlpha=opacity;
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image,
                  -w/2, -h/2);

    ctx.restore();
};

Sprite.prototype.drawCentredAtAnimated = function (ctx, frameIndex, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;

    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    // Draw the correct image from the sprite sheet, frameIndex decides on the y coords
    // where on the sprite sheet the correct image is
    ctx.drawImage(this.image,
                   0,
                   frameIndex * h,
                   w,
                   h,
                  -w/2,
                  -h/2,
                   w,
                   h);

    ctx.restore();
};

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation = 0) {

    // Get "screen width"
    var sw = g_gameWidth;

    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);

    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen height"
    var sh = g_gameHeight;

    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);

    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};
