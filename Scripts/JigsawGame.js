var Game = {
    vCount: 0,
    hCount: 0,
    bWidth: 0,
    moveDis: 0,

    blocks: [],

    emptyBlock: { x: 0, y: 0 },

    // vc:纵向方块数
    // hc:横向方块数
    // bw:方块边长
    init: function(vc, hc, bw) {
        Game.vCount = vc;
        Game.hCount = hc;
        Game.bWidth = bw;
        Game.emptyBlock.x = hc - 1;
        Game.emptyBlock.y = vc - 1;
        this.moveDis = bw + 1;

        // 设置游戏外框大小
        $("#container").css({ width: hc * (bw + 1), height: vc * (bw + 1) + 1 });

        // 生成方块，并添加到框中
        for (var v = 0; v < vc; v++) {
            var tmp = [];
            for (var h = 0; h < hc; h++) {
                if (v == vc - 1 && h == hc - 1) {
                    tmp[h] = Game.emptyBlock;
                }
                else {
                    tmp[h] = new Block(h, v);
                    tmp[h].addToContainer();
                }
            }
            Game.blocks[v] = tmp;
        }
    },
    // 将方块打乱,n:打乱次数
    mix: function(n) {
        var t = n || 50;
        var lr = 3;
        for (var i = 0; i < t; i++) {
            var r = Math.floor(Math.random() * 4);
            // 增加混淆质量
            while (!this.valid(r) && (r + lr != 3)) {
                r = Math.floor(Math.random() * 4);
            }
            switch (r) {
                case 0: this.moveLeft(); break;
                case 3: this.moveRight(); break;
                case 1: this.moveUp(); break;
                case 2: this.moveDown(); break;
            }
        }
    },
    valid: function(r) {
        if (this.emptyBlock.x == this.hCount && r == 0) return false;
        if (this.emptyBlock.y == this.vCount && r == 1) return false;
        if (this.emptyBlock.x == 0 && r == 3) return false;
        if (this.emptyBlock.y == 0 && r == 2) return false;
        return true;
    },
    getBlock: function(x, y) {
        return this.blocks[y][x];
    },
    swap: function(b) {
        var tmp = this.blocks[b.py][b.px];
        this.blocks[b.py][b.px] = this.emptyBlock;
        this.blocks[this.emptyBlock.y][this.emptyBlock.x] = tmp;
        this.emptyBlock.x = tmp.px;
        this.emptyBlock.y = tmp.py;
    },
    moveLeft: function() {
        if (this.emptyBlock.x < this.hCount - 1) {
            var b = this.getBlock(this.emptyBlock.x + 1, this.emptyBlock.y);
            this.swap(b);
            b.moveLeft();
        }
    },
    moveRight: function() {
        if (this.emptyBlock.x > 0) {
            var b = this.getBlock(this.emptyBlock.x - 1, this.emptyBlock.y);
            this.swap(b);
            b.moveRight();
        }
    },
    moveUp: function() {
        if (this.emptyBlock.y < this.vCount - 1) {
            var b = this.getBlock(this.emptyBlock.x, this.emptyBlock.y + 1);
            this.swap(b);
            b.moveUp();
        }
    },
    moveDown: function() {
        if (this.emptyBlock.y > 0) {
            var b = this.getBlock(this.emptyBlock.x, this.emptyBlock.y - 1);
            this.swap(b);
            b.moveDown();
        }
    }
};

var Block = function(x, y) {
    this.ox = x;    // 原座标X
    this.oy = y;    // 原座标Y
    this.px = x;    // 当前座标X
    this.py = y;    // 当前座标Y

    var val = y * Game.hCount + x + 1;
    this.obj = $("<div></div>").css({ width: Game.bWidth, height: Game.bWidth }).addClass("block").append("<div>" + val + "</div>");

    this.addToContainer = function() {
        $("#container").append(this.obj);
    };

    this.moveLeft = function() {
        this.px--;
        this.obj.animate({ left: '-=' + Game.moveDis + 'px' }, 200);
    };
    this.moveRight = function() {
        this.px++;
        this.obj.animate({ left: '+=' + Game.moveDis + 'px' }, 200);
    };
    this.moveUp = function() {
        this.py--;
        this.obj.animate({ top: '-=' + Game.moveDis + 'px' }, 200);
    };
    this.moveDown = function() {
        this.py++;
        this.obj.animate({ top: '+=' + Game.moveDis + 'px' }, 200);
    };
};