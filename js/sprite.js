(function() {
    function Sprite(url, pos, size, speed, frames, dir, once, stay) {
        this.pos = pos;
        this.size = size;
        this.speed = typeof speed === 'number' ? speed : 0;
        this.frames = frames;
        this._index = 0;
        this.url = url;
        this.dir = dir || 'horizontal';
        this.once = once;
        this.stay = stay || 0;
    };

    Sprite.prototype = {
        update: function(dt) {
            this._index += this.speed*dt;
        },

        render: function(ctx) {
            var frame;

            if(this.speed > 0) {
                var max = this.frames.length;
                var idx = Math.floor(this._index);
                frame = this.frames[idx % max];
                if(this.once && idx >= max) {
                    if( this.stay ){
                        frame = max-1;
                    }
                    this.done = true;
                }
            }
            else {
                frame = 0;
            }

            var x = this.pos[0];
            var y = this.pos[1];

            if(this.dir == 'vertical') {
                y += frame * this.size[1];
            }
            else {
                x += frame * this.size[0];
            }
            var img = new Image();
            img.src = this.url;
            ctx.drawImage(img,
                x, y,
                this.size[0], this.size[1],
                0, 0,
                this.size[0], this.size[1]);
        }
    };

    window.Sprite = Sprite;
})();