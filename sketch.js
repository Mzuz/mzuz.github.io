class Segment {
    constructor(x, y, color, stat, bound, inside) {
        this.x = x;
        this.y = y;
        this.color = color
        this.stat = stat;
        this.bound = bound;
        this.inside = inside;
        this.limit = 5;
        this.num = 0;
    }

    display() {
        push();
        translate(this.x * size, this.y * size);
        fill(this.color);
        stroke(120);
        rect(0, 0, size, size)

        if (this.num != 0) {
            textAlign(CENTER, CENTER);
            textSize(24);
            fill(0);
            stroke(255);
            text(this.num, 3, 3, size, size);
        }

        pop();
    }

    action() {
        this.increaseNum();
    }

    checkPointing() {

        if (mouseX > this.x * size && mouseX < this.x * size + size &&
            mouseY > this.y * size && mouseY < this.y * size + size) {
            return true;
        } else {
            return false;
        }

    }

    increaseNum() {
        this.num++;
        this.num = this.num % this.limit;
    }

}

class Btn {
    constructor(x, y, txt, act) {
        this.x = x;
        this.y = y;
        this.txt = txt;
        this.bound = false;
        this.inside = false;
        this.act = act;
    }

    display() {
        push();
        translate(this.x * size, this.y * size);

        fill(255);
        stroke(120);
        rect(0, 0, size, size, 5, 5, 5, 5)

        fill(0);
        textAlign(CENTER, CENTER)
        text(this.txt, 1, 1, size, size);

        pop();
    }

    action() {
        if (this.act == 'o') {
            resetBounds();
        } else if (this.act == 'p') {
            resetInside();
        }
    }

    checkPointing() {

        if (mouseX > this.x * size && mouseX < this.x * size + size &&
            mouseY > this.y * size && mouseY < this.y * size + size) {
            return true;
        } else {
            return false;
        }

    }
}

let segments = [],
    bd = [],
    ins = [];

let bound = [2, 3, 4, 5, 7, 12, 13, 18, 19, 24, 25, 30, 31, 32, 33, 34, 35];
let skalar;
let colors;
let size;
let n = 1;

function createMenu() {
    skalar = createSlider(60, 140, 60, 10);
    select('.scale').child(skalar);
    skalar.changed(resize);
}

function resize() {
    size = skalar.value();
    print('done!');
    resizeCanvas(size * 6, size * 6)
}

function resetBounds() {
    for (b of bd) {
        segments[b].num = 0;
    }
}

function resetInside() {
    for (i of ins) {
        segments[i].num = 0;
    }
}

function setup() {
    createMenu();
    size = skalar.value();

    let c = createCanvas(size * 6, size * 6);
    select('.box').child(c);

    colors = [color(255, 255, 255), color(194, 178, 128), color(0, 127, 255), color(184, 3, 255), color(0, 255, 0)];
    for (let i = 0; i < 6; i++) {

        for (let j = 0; j < 6; j++) {

            if (n == 31) {
                segments.push(new Btn(j, i, 'Reset oznaczeń', 'o'))
            } else if (n == 36) {
                segments.push(new Btn(j, i, 'Reset planszy', 'p'))
            } else {

                if (n != 1 && n != 6) {
                    if (bound.includes(n)) {
                        segments.push(new Segment(j, i, color(211, 211, 211), false, true, false));
                        bd.push(segments.length - 1);
                    } else {
                        segments.push(new Segment(j, i, color(255, 160, 122), true, false, true));
                        ins.push(segments.length - 1);
                    }
                }

            }
            n++;
        }
    }
}

function draw() {
    background('#553D67');

    for (let s of segments) {

        s.display();

        if (s.stat) {

            s.color = colors[s.num];
        }
    }

}

function mouseClicked() {
    for (s of segments) {
        if (s.checkPointing()) {
            s.action();
        }
    }
}