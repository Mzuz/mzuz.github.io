class Segment {
    constructor(x, y, color, stat) {
        this.x = x;
        this.y = y;
        this.color = color
        this.stat = stat;
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
            fill(255);
            stroke(255);
            text(this.num, 3, 3, size, size);
        }

        pop();
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

let segments = [];

let bound = [2, 3, 4, 5, 31, 32, 33, 34, 35, 7, 13, 19, 25, 12, 18, 24, 30, 18];
let skalar;
let colors;
let size;
let n = 1,
    z;

function createMenu() {
    skalar = createSlider(60, 120, 60, 20);
    select('.scale').child(skalar);
    skalar.changed(resize);
}

function resize() {
    size = skalar.value();
    print('done!');
    resizeCanvas(size * 6, size * 6)
}

function setup() {
    createMenu();
    size = skalar.value();

    let c = createCanvas(size * 6, size * 6);
    select('.box').child(c);

    colors = [color(255, 255, 255), color(194, 178, 128), color(0, 127, 255), color(184, 3, 255), color(0, 255, 0)];
    for (let i = 0; i < 6; i++) {

        for (let j = 0; j < 6; j++) {
            if (n != 1 && n != 6 && n != 31 && n != 36) {

                if (bound.includes(n)) {
                    segments.push(new Segment(j, i, color(211, 211, 211), false));
                } else {
                    segments.push(new Segment(j, i, color(255, 160, 122), true));
                }
            }
            n++;
        }
    }
    z = true;
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
            s.increaseNum();
        }
    }
}